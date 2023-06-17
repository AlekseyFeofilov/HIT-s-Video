import {VideoDto} from "../../domain/dtos/video/videoDto";
import {Video} from "../../domain/models/video/video";
import {Group} from "../../domain/models/group/group";
import {TagMapper} from "./tagMapper";
import {VideoCreate} from "../../domain/models/video/videoCreate";
import {CreationVideoDto} from "../../domain/dtos/video/creationVideoDto";

export class VideoMapper {
  static VideoDtoToVideo(videoDto: VideoDto, group: Group): Video{
    return new Video(
      videoDto.id,
      videoDto.title,
      videoDto.description,
      videoDto.recordingDateTime,
      videoDto.tags.map(TagMapper.TagDtoToTag),
      group,
      videoDto.subject,
      new URL(videoDto.playerUrl),
    )
  }

  static VideoCreateToCreationVideoDto(videoCreate: VideoCreate): CreationVideoDto{
    return new CreationVideoDto(
      videoCreate.title,
      videoCreate.description,
      new Date(videoCreate.recordingDateTime!.year, videoCreate.recordingDateTime!.month, videoCreate.recordingDateTime!.day),
      videoCreate.subjectId,
      videoCreate.tags.map(TagMapper.TagToTagDto).filter(x => x.values.length !== 0)
    )
  }
}
