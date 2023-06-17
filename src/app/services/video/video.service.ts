import {Injectable, Optional} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Tag} from "../../domain/models/tag/tag";
import {Video} from "../../domain/models/video/video";
import {Configuration} from "../../../../configuration";
import {BASE_URL} from "../../../constants/app.constants";
import {CreationVideoDto} from "../../domain/dtos/video/creationVideoDto";
import {Observable} from "rxjs";
import {UploadVideoDto} from "../../domain/dtos/video/uploadVideoDto";
import {SearchVideoDto} from "../../domain/dtos/video/searchVideoDto";
import {PageDtoVideoDto} from "../../domain/dtos/video/pageDtoVideoDto";
import {VideoDto} from "../../domain/dtos/video/videoDto";
import {CustomHttpUrlEncodingCodec} from "../../../../encoder";
import {VideoAbstractService} from "./video.abstract.service";

@Injectable()
export class VideoService implements VideoAbstractService {
  // url = 'http://localhost:3000/videos';
  //
  // constructor(private httpClient: HttpClient) {
  // }
  //
  // fetchGroupVideos(groupId: string) {
  //   return this.httpClient.get<Video[]>(`${this.url}`);
  // }
  //
  // fetchVideo(id: number){
  //   return this.httpClient.get<Video>(`${this.url}/${id}`);
  // }

  protected basePath = BASE_URL;
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient, @Optional() configuration: Configuration) {
    if (configuration) {
      this.configuration = configuration;
    }
  }

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  private canConsumeForm(consumes: string[]): boolean {
    const form = 'multipart/form-data';
    for (const consume of consumes) {
      if (form === consume) {
        return true;
      }
    }
    return false;
  }


  /**
   * Создание видео в группе
   *
   * @param body
   * @param groupId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createGroupVideo(body: CreationVideoDto, groupId: string, observe?: 'body', reportProgress?: boolean): Observable<UploadVideoDto>;
  public createGroupVideo(body: CreationVideoDto, groupId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<UploadVideoDto>>;
  public createGroupVideo(body: CreationVideoDto, groupId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<UploadVideoDto>>;
  public createGroupVideo(body: CreationVideoDto, groupId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling createGroupVideo.');
    }

    if (groupId === null || groupId === undefined) {
      throw new Error('Required parameter groupId was null or undefined when calling createGroupVideo.');
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json'
    ];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<UploadVideoDto>('post',`${this.basePath}/groups/${encodeURIComponent(String(groupId))}/videos/new`,
      {
        body: body,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Удаление видео
   *
   * @param videoId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deleteVideo(videoId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public deleteVideo(videoId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public deleteVideo(videoId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public deleteVideo(videoId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (videoId === null || videoId === undefined) {
      throw new Error('Required parameter videoId was null or undefined when calling deleteVideo.');
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
    ];

    return this.httpClient.request<any>('delete',`${this.basePath}/videos/${encodeURIComponent(String(videoId))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Поиск видео в группе
   *
   * @param body
   * @param groupId
   * @param page
   * @param count
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getGroupVideos(body: SearchVideoDto, groupId: string, page?: number, count?: number, observe?: 'body', reportProgress?: boolean): Observable<PageDtoVideoDto>;
  public getGroupVideos(body: SearchVideoDto, groupId: string, page?: number, count?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageDtoVideoDto>>;
  public getGroupVideos(body: SearchVideoDto, groupId: string, page?: number, count?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageDtoVideoDto>>;
  public getGroupVideos(body: SearchVideoDto, groupId: string, page?: number, count?: number, observe: any = 'body', reportProgress: boolean = false ): any {

    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling getGroupVideos.');
    }

    if (groupId === null || groupId === undefined) {
      throw new Error('Required parameter groupId was null or undefined when calling getGroupVideos.');
    }



    let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    if (page !== undefined && page !== null) {
      queryParameters = queryParameters.set('page', <any>page);
    }
    if (count !== undefined && count !== null) {
      queryParameters = queryParameters.set('count', <any>count);
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json'
    ];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<PageDtoVideoDto>('post',`${this.basePath}/groups/${encodeURIComponent(String(groupId))}/videos/search`,
      {
        body: body,
        params: queryParameters,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Получение информации о видео
   *
   * @param videoId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getVideo(videoId: string, observe?: 'body', reportProgress?: boolean): Observable<VideoDto>;
  public getVideo(videoId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<VideoDto>>;
  public getVideo(videoId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<VideoDto>>;
  public getVideo(videoId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (videoId === null || videoId === undefined) {
      throw new Error('Required parameter videoId was null or undefined when calling getVideo.');
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
    ];

    return this.httpClient.request<VideoDto>('get',`${this.basePath}/videos/${encodeURIComponent(String(videoId))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Обновление видео
   *
   * @param body
   * @param videoId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public updateVideo(body: CreationVideoDto, videoId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public updateVideo(body: CreationVideoDto, videoId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public updateVideo(body: CreationVideoDto, videoId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public updateVideo(body: CreationVideoDto, videoId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling updateVideo.');
    }

    if (videoId === null || videoId === undefined) {
      throw new Error('Required parameter videoId was null or undefined when calling updateVideo.');
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json'
    ];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<any>('put',`${this.basePath}/videos/${encodeURIComponent(String(videoId))}`,
      {
        body: body,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }
}
