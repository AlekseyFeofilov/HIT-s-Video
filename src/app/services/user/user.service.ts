import {Inject, Injectable, Optional} from '@angular/core';
import {BASE_URL} from "../../../constants/app.constants";
import {HttpClient, HttpEvent, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Configuration} from "../../../../configuration";
import {Observable} from "rxjs";
import {UserDto} from "../../domain/dtos/user/userDto";
import {JoiningGroupDto} from "../../domain/dtos/invitation/joiningGroupDto";
import {UserAbstractService} from "./user.abstract.service";

@Injectable()
export class UserService implements UserAbstractService {

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
   * Информация о себе
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getAboutMe(observe?: 'body', reportProgress?: boolean): Observable<UserDto>;
  public getAboutMe(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<UserDto>>;
  public getAboutMe(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<UserDto>>;
  public getAboutMe(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

    return this.httpClient.request<UserDto>('get',`${this.basePath}/user/me`,
      {
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
}
