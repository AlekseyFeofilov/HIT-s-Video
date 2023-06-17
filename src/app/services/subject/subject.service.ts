import {Injectable, Optional} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Tag} from "../../domain/models/tag/tag";
import {Subject} from "../../domain/models/subject/subject";
import {BASE_URL} from "../../../constants/app.constants";
import {Configuration} from "../../../../configuration";
import {CreationSubjectDto} from "../../domain/dtos/subject/creationSubjectDto";
import {Observable} from "rxjs";
import {SearchSubjectDto} from "../../domain/dtos/subject/searchSubjectDto";
import {PageDtoSubjectDto} from "../../domain/dtos/subject/pageDtoSubjectDto";
import {CustomHttpUrlEncodingCodec} from "../../../../encoder";
import {UpdateSubjectDto} from "../../domain/dtos/subject/updateSubjectDto";
import {SubjectAbstractService} from "./subject.abstract.service";

@Injectable()
export class SubjectService implements SubjectAbstractService {
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
   * Создание предмета в группе
   *
   * @param body
   * @param groupId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createSubject(body: CreationSubjectDto, groupId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public createSubject(body: CreationSubjectDto, groupId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public createSubject(body: CreationSubjectDto, groupId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public createSubject(body: CreationSubjectDto, groupId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling createSubject.');
    }

    if (groupId === null || groupId === undefined) {
      throw new Error('Required parameter groupId was null or undefined when calling createSubject.');
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

    return this.httpClient.request<any>('post',`${this.basePath}/groups/${encodeURIComponent(String(groupId))}/subjects/new`,
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
   * Удаление предмета
   *
   * @param subjectId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deleteSubject(subjectId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public deleteSubject(subjectId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public deleteSubject(subjectId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public deleteSubject(subjectId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (subjectId === null || subjectId === undefined) {
      throw new Error('Required parameter subjectId was null or undefined when calling deleteSubject.');
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

    return this.httpClient.request<any>('delete',`${this.basePath}/subjects/${encodeURIComponent(String(subjectId))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Поиск предметов в группе
   *
   * @param body
   * @param groupId
   * @param page
   * @param count
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getSubjects(body: SearchSubjectDto, groupId: string, page?: number, count?: number, observe?: 'body', reportProgress?: boolean): Observable<PageDtoSubjectDto>;
  public getSubjects(body: SearchSubjectDto, groupId: string, page?: number, count?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageDtoSubjectDto>>;
  public getSubjects(body: SearchSubjectDto, groupId: string, page?: number, count?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageDtoSubjectDto>>;
  public getSubjects(body: SearchSubjectDto, groupId: string, page?: number, count?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling getSubjects.');
    }

    if (groupId === null || groupId === undefined) {
      throw new Error('Required parameter groupId was null or undefined when calling getSubjects.');
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

    return this.httpClient.request<PageDtoSubjectDto>('post',`${this.basePath}/groups/${encodeURIComponent(String(groupId))}/subjects/search`,
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
   * Обновление предмета
   *
   * @param body
   * @param subjectId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public updateSubject(body: UpdateSubjectDto, subjectId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public updateSubject(body: UpdateSubjectDto, subjectId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public updateSubject(body: UpdateSubjectDto, subjectId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public updateSubject(body: UpdateSubjectDto, subjectId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling updateSubject.');
    }

    if (subjectId === null || subjectId === undefined) {
      throw new Error('Required parameter subjectId was null or undefined when calling updateSubject.');
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

    return this.httpClient.request<any>('put',`${this.basePath}/subjects/${encodeURIComponent(String(subjectId))}`,
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
