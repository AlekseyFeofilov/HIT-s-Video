import {Injectable, Optional} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Group} from "../../domain/models/group/group";
import {Tag} from "../../domain/models/tag/tag";
import {filter, map, Observable, pipe, tap} from "rxjs";
import {BASE_URL} from "../../../constants/app.constants";
import {Configuration} from "../../../../configuration";
import {SearchTagDto} from "../../domain/dtos/tag/searchTagDto";
import {PageDtoTagDto} from "../../domain/dtos/tag/pageDtoTagDto";
import {CustomHttpUrlEncodingCodec} from "../../../../encoder";
import {TagAbstractService} from "./tag.abstract.service";

@Injectable()
export class TagService implements TagAbstractService{
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
   * Поиск тегов в группе
   *
   * @param body
   * @param groupId
   * @param page
   * @param count
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getTags(body: SearchTagDto, groupId: string, page?: number, count?: number, observe?: 'body', reportProgress?: boolean): Observable<PageDtoTagDto>;
  public getTags(body: SearchTagDto, groupId: string, page?: number, count?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageDtoTagDto>>;
  public getTags(body: SearchTagDto, groupId: string, page?: number, count?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageDtoTagDto>>;
  public getTags(body: SearchTagDto, groupId: string, page?: number, count?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling getTags.');
    }

    if (groupId === null || groupId === undefined) {
      throw new Error('Required parameter groupId was null or undefined when calling getTags.');
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

    return this.httpClient.request<PageDtoTagDto>('post',`${this.basePath}/groups/${encodeURIComponent(String(groupId))}/tags/search`,
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
}
