import {SearchTagDto} from "../../domain/dtos/tag/searchTagDto";
import {Observable} from "rxjs";
import {PageDtoTagDto} from "../../domain/dtos/tag/pageDtoTagDto";

export abstract class TagAbstractService {
  public abstract getTags(body: SearchTagDto, groupId: string, page?: number, count?: number, observe?: 'body', reportProgress?: boolean): Observable<PageDtoTagDto>;
}
