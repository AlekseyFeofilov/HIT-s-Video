import {TagDto} from "../../domain/dtos/tag/tagDto";
import {Tag} from "../../domain/models/tag/tag";

export class TagMapper {
  static TagDtoToTag(tagDto: TagDto): Tag{
    return new Tag(
      tagDto.id,
      tagDto.key,
      tagDto.values,
    )
  }

  static TagToTagDto(tag: Tag): TagDto{
    return new TagDto(
      tag.id,
      tag.name,
      tag.values
    )
  }
}
