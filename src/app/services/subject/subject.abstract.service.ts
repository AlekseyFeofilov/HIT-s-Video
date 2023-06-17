import {Observable} from "rxjs";
import {CreationSubjectDto} from "../../domain/dtos/subject/creationSubjectDto";
import {UpdateSubjectDto} from "../../domain/dtos/subject/updateSubjectDto";
import {SearchSubjectDto} from "../../domain/dtos/subject/searchSubjectDto";
import {PageDtoSubjectDto} from "../../domain/dtos/subject/pageDtoSubjectDto";

export abstract class SubjectAbstractService {
  public abstract createSubject(body: CreationSubjectDto, groupId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public abstract deleteSubject(subjectId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public abstract updateSubject(body: UpdateSubjectDto, subjectId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public abstract getSubjects(body: SearchSubjectDto, groupId: string, page?: number, count?: number, observe?: 'body', reportProgress?: boolean): Observable<PageDtoSubjectDto>;
}
