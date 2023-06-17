/**
 * OpenAPI definition
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import {SubjectDto} from './subjectDto';

export class PageDtoSubjectDto {
  constructor(/**
               * Номер страницы
               */
              public pageNumber: number,
              /**
               * Размер страницы
               */
              public pageSize: number,
              /**
               * Количество элементов на странице
               */
              public numberOfElements: number,
              /**
               * Всего страниц
               */
              public totalPages: number,
              /**
               * Всего элементов
               */
              public totalElements: number,
              /**
               * Элементы страницы
               */
              public content: SubjectDto[],
  ) {
  }

}
