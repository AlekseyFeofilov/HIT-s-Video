import {Observable} from "rxjs";
import {CreationGroupDto} from "../../domain/dtos/group/creationGroupDto";
import {CreationVideoDto} from "../../domain/dtos/video/creationVideoDto";
import {UploadVideoDto} from "../../domain/dtos/video/uploadVideoDto";
import {CreationInvitationDto} from "../../domain/dtos/invitation/creationInvitationDto";
import {CreatedInvitationDto} from "../../domain/dtos/invitation/createdInvitationDto";
import {CreationSubjectDto} from "../../domain/dtos/subject/creationSubjectDto";
import {PageDtoInvitationDto} from "../../domain/dtos/invitation/pageDtoInvitationDto";
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

export abstract class GroupAbstractService {
  public abstract createGroup(body: CreationGroupDto, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public abstract createGroupVideo(body: CreationVideoDto, groupId: string, observe?: 'body', reportProgress?: boolean): Observable<UploadVideoDto>;
  public abstract createInvitation(body: CreationInvitationDto, groupId: string, observe?: 'body', reportProgress?: boolean): Observable<CreatedInvitationDto>;
  public abstract createSubject(body: CreationSubjectDto, groupId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public abstract deleteGroup(groupId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public abstract getGroupInvitations(groupId: string, page?: number, count?: number, observe?: 'body', reportProgress?: boolean): Observable<PageDtoInvitationDto>;
  public abstract getGroupMembers(body: SearchMemberDto, groupId: string, page?: number, count?: number, observe?: 'body', reportProgress?: boolean): Observable<PageDtoMemberDto>;
  public abstract getGroupVideos(body: SearchVideoDto, groupId: string, page?: number, count?: number, observe?: 'body', reportProgress?: boolean): Observable<PageDtoVideoDto>;
  public abstract getGroups(body: SearchGroupDto, page?: number, count?: number, observe?: 'body', reportProgress?: boolean): Observable<PageDtoGroupDto>;
  public abstract getSubjects(body: SearchSubjectDto, groupId: string, page?: number, count?: number, observe?: 'body', reportProgress?: boolean): Observable<PageDtoSubjectDto>;
  public abstract getTags(body: SearchTagDto, groupId: string, page?: number, count?: number, observe?: 'body', reportProgress?: boolean): Observable<PageDtoTagDto>;
  public abstract joinToGroup(body: JoiningGroupDto, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public abstract kickGroupMembers(groupId: string, userId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public abstract quitFromGroup(groupId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public abstract updateGroup(body: UpdateGroupDto, groupId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public abstract updateGroupMembers(body: UpdateMemberDto, groupId: string, userId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
}
