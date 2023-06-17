import {CreationVideoDto} from "../../domain/dtos/video/creationVideoDto";
import {Observable} from "rxjs";
import {UploadVideoDto} from "../../domain/dtos/video/uploadVideoDto";
import {SearchVideoDto} from "../../domain/dtos/video/searchVideoDto";
import {PageDtoVideoDto} from "../../domain/dtos/video/pageDtoVideoDto";
import {VideoDto} from "../../domain/dtos/video/videoDto";

export abstract class VideoAbstractService {
  public abstract createGroupVideo(body: CreationVideoDto, groupId: string, observe?: 'body', reportProgress?: boolean): Observable<UploadVideoDto>;
  public abstract deleteVideo(videoId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public abstract getGroupVideos(body: SearchVideoDto, groupId: string, page?: number, count?: number, observe?: 'body', reportProgress?: boolean): Observable<PageDtoVideoDto>;
  public abstract getVideo(videoId: string, observe?: 'body', reportProgress?: boolean): Observable<VideoDto>;
  public abstract updateVideo(body: CreationVideoDto, videoId: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
}
