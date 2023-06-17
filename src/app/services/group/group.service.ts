import {Injectable, Optional} from '@angular/core';
import {Group} from "../../domain/models/group/group";
import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {catchError, Observable, tap} from "rxjs";
import {BASE_URL} from "../../../constants/app.constants";
import {Configuration} from "../../../../configuration";
import {CreationGroupDto} from "../../domain/dtos/group/creationGroupDto";
import {CreationVideoDto} from "../../domain/dtos/video/creationVideoDto";
import {UploadVideoDto} from "../../domain/dtos/video/uploadVideoDto";
import {CreationInvitationDto} from "../../domain/dtos/invitation/creationInvitationDto";
import {CreatedInvitationDto} from "../../domain/dtos/invitation/createdInvitationDto";
import {CreationSubjectDto} from "../../domain/dtos/subject/creationSubjectDto";
import {CustomHttpUrlEncodingCodec} from "../../../../encoder";
import {SearchMemberDto} from "../../domain/dtos/member/searchMemberDto";
import {PageDtoMemberDto} from "../../domain/dtos/member/pageDtoMemberDto";
import {SearchVideoDto} from "../../domain/dtos/video/searchVideoDto";
import {PageDtoVideoDto} from "../../domain/dtos/video/pageDtoVideoDto";
import {SearchGroupDto} from "../../domain/dtos/group/searchGroupDto";
import {PageDtoGroupDto} from "../../domain/dtos/group/pageDtoGroupDto";
import {SearchSubjectDto} from "../../domain/dtos/subject/searchSubjectDto";
import {PageDtoSubjectDto} from "../../domain/dtos/subject/pageDtoSubjectDto";
import {SearchTagDto} from "../../domain/dtos/tag/searchTagDto";
import {PageDtoTagDto} from "../../domain/dtos/tag/pageDtoTagDto";
import {JoiningGroupDto} from "../../domain/dtos/invitation/joiningGroupDto";
import {UpdateGroupDto} from "../../domain/dtos/group/updateGroupDto";
import {UpdateMemberDto} from "../../domain/dtos/member/updateMemberDto";
import {PageDtoInvitationDto} from "../../domain/dtos/invitation/pageDtoInvitationDto";
import {GroupAbstractService} from "./group.abstract.service";

@Injectable()
export class GroupService implements GroupAbstractService {
  protected basePath = BASE_URL;
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient, @Optional() configuration: Configuration) {
    if (configuration) {
      this.configuration = configuration;
      this.basePath = BASE_URL || configuration.basePath || this.basePath;
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
   * Создание группы
   *
   * @param body
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createGroup(body: CreationGroupDto, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public createGroup(body: CreationGroupDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public createGroup(body: CreationGroupDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public createGroup(body: CreationGroupDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling createGroup.');
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

    return this.httpClient.request<any>('post',`${this.basePath}/groups/new`,
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
   * Создание приглашения в группе
   *
   * @param body
   * @param groupId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createInvitation(body: CreationInvitationDto, groupId: string, observe?: 'body', reportProgress?: boolean): Observable<CreatedInvitationDto>;
  public createInvitation(body: CreationInvitationDto, groupId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CreatedInvitationDto>>;
  public createInvitation(body: CreationInvitationDto, groupId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CreatedInvitationDto>>;
  public createInvitation(body: CreationInvitationDto, groupId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling createInvitation.');
    }

    if (groupId === null || groupId === undefined) {
      throw new Error('Required parameter groupId was null or undefined when calling createInvitation.');
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

    return this.httpClient.request<CreatedInvitationDto>('post',`${this.basePath}/groups/${encodeURIComponent(String(groupId))}/invitations/new`,
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
   * Удаление группы
   *
   * @param groupId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deleteGroup(groupId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public deleteGroup(groupId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public deleteGroup(groupId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public deleteGroup(groupId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (groupId === null || groupId === undefined) {
      throw new Error('Required parameter groupId was null or undefined when calling deleteGroup.');
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

    return this.httpClient.request<any>('delete',`${this.basePath}/groups/${encodeURIComponent(String(groupId))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Список приглашений в группе
   *
   * @param groupId
   * @param page
   * @param count
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getGroupInvitations(groupId: string, page?: number, count?: number, observe?: 'body', reportProgress?: boolean): Observable<PageDtoInvitationDto>;
  public getGroupInvitations(groupId: string, page?: number, count?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageDtoInvitationDto>>;
  public getGroupInvitations(groupId: string, page?: number, count?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageDtoInvitationDto>>;
  public getGroupInvitations(groupId: string, page?: number, count?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (groupId === null || groupId === undefined) {
      throw new Error('Required parameter groupId was null or undefined when calling getGroupInvitations.');
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
    ];

    return this.httpClient.request<PageDtoInvitationDto>('get',`${this.basePath}/groups/${encodeURIComponent(String(groupId))}/invitations`,
      {
        params: queryParameters,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Список участников в группе
   *
   * @param body
   * @param groupId
   * @param page
   * @param count
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getGroupMembers(body: SearchMemberDto, groupId: string, page?: number, count?: number, observe?: 'body', reportProgress?: boolean): Observable<PageDtoMemberDto>;
  public getGroupMembers(body: SearchMemberDto, groupId: string, page?: number, count?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageDtoMemberDto>>;
  public getGroupMembers(body: SearchMemberDto, groupId: string, page?: number, count?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageDtoMemberDto>>;
  public getGroupMembers(body: SearchMemberDto, groupId: string, page?: number, count?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling getGroupMembers.');
    }

    if (groupId === null || groupId === undefined) {
      throw new Error('Required parameter groupId was null or undefined when calling getGroupMembers.');
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

    return this.httpClient.request<PageDtoMemberDto>('post',`${this.basePath}/groups/${encodeURIComponent(String(groupId))}/members/search`,
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
  public getGroupVideos(body: SearchVideoDto, groupId: string, page?: number, count?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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
   * Поиск групп
   *
   * @param body
   * @param page
   * @param count
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getGroups(body: SearchGroupDto, page?: number, count?: number, observe?: 'body', reportProgress?: boolean): Observable<PageDtoGroupDto>;
  public getGroups(body: SearchGroupDto, page?: number, count?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageDtoGroupDto>>;
  public getGroups(body: SearchGroupDto, page?: number, count?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageDtoGroupDto>>;
  public getGroups(body: SearchGroupDto, page?: number, count?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling getGroups.');
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

    return this.httpClient.request<PageDtoGroupDto>('post',`${this.basePath}/groups/search`,
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

  /**
   * Присоединение к группе по коду приглашения
   *
   * @param body
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public joinToGroup(body: JoiningGroupDto, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public joinToGroup(body: JoiningGroupDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public joinToGroup(body: JoiningGroupDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public joinToGroup(body: JoiningGroupDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling joinToGroup.');
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

    return this.httpClient.request<any>('post',`${this.basePath}/groups/entrance`,
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
   * Кикнуть участника из группы
   *
   * @param groupId
   * @param userId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public kickGroupMembers(groupId: string, userId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public kickGroupMembers(groupId: string, userId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public kickGroupMembers(groupId: string, userId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public kickGroupMembers(groupId: string, userId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (groupId === null || groupId === undefined) {
      throw new Error('Required parameter groupId was null or undefined when calling kickGroupMembers.');
    }

    if (userId === null || userId === undefined) {
      throw new Error('Required parameter userId was null or undefined when calling kickGroupMembers.');
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

    return this.httpClient.request<any>('delete',`${this.basePath}/groups/${encodeURIComponent(String(groupId))}/members/${encodeURIComponent(String(userId))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Выйти из группы
   *
   * @param groupId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public quitFromGroup(groupId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public quitFromGroup(groupId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public quitFromGroup(groupId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public quitFromGroup(groupId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (groupId === null || groupId === undefined) {
      throw new Error('Required parameter groupId was null or undefined when calling quitFromGroup.');
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

    return this.httpClient.request<any>('post',`${this.basePath}/groups/${encodeURIComponent(String(groupId))}/exit`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Обновление группы
   *
   * @param body
   * @param groupId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public updateGroup(body: UpdateGroupDto, groupId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public updateGroup(body: UpdateGroupDto, groupId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public updateGroup(body: UpdateGroupDto, groupId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public updateGroup(body: UpdateGroupDto, groupId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling updateGroup.');
    }

    if (groupId === null || groupId === undefined) {
      throw new Error('Required parameter groupId was null or undefined when calling updateGroup.');
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

    return this.httpClient.request<any>('put',`${this.basePath}/groups/${encodeURIComponent(String(groupId))}`,
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
   * Обновить участника в группе
   *
   * @param body
   * @param groupId
   * @param userId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public updateGroupMembers(body: UpdateMemberDto, groupId: string, userId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public updateGroupMembers(body: UpdateMemberDto, groupId: string, userId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public updateGroupMembers(body: UpdateMemberDto, groupId: string, userId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public updateGroupMembers(body: UpdateMemberDto, groupId: string, userId: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling updateGroupMembers.');
    }

    if (groupId === null || groupId === undefined) {
      throw new Error('Required parameter groupId was null or undefined when calling updateGroupMembers.');
    }

    if (userId === null || userId === undefined) {
      throw new Error('Required parameter userId was null or undefined when calling updateGroupMembers.');
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

    return this.httpClient.request<any>('put',`${this.basePath}/groups/${encodeURIComponent(String(groupId))}/members/${encodeURIComponent(String(userId))}`,
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
