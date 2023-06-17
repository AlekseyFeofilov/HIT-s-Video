import {JoiningGroupDto} from "../../domain/dtos/invitation/joiningGroupDto";
import {Observable} from "rxjs";
import {UserDto} from "../../domain/dtos/user/userDto";

export abstract class UserAbstractService {
  public abstract getAboutMe(observe?: 'body', reportProgress?: boolean): Observable<UserDto>;
  public abstract joinToGroup(body: JoiningGroupDto, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public abstract quitFromGroup(groupId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
}
