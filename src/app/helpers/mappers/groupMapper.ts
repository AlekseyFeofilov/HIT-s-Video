import {GroupDto} from "../../domain/dtos/group/groupDto";
import {Group} from "../../domain/models/group/group";
import {CreationGroupDto} from "../../domain/dtos/group/creationGroupDto";
import {GroupCreate} from "../../domain/models/group/groupCreate";

export class GroupMapper {
  static groupDtoToGroup(groupDto: GroupDto): Group {
    return new Group(
      groupDto.id,
      groupDto.name,
      [],
    )
  }

  static groupCreateToCreationGroupDto(groupCreate: GroupCreate): CreationGroupDto {
    return new CreationGroupDto(groupCreate.name);
  }
}
