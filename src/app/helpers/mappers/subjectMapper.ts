import {SubjectCreate} from "../../domain/models/subject/subjectCreate";
import {CreationSubjectDto} from "../../domain/dtos/subject/creationSubjectDto";
import {SubjectDto} from "../../domain/dtos/subject/subjectDto";
import {Subject} from "../../domain/models/subject/subject";

export class SubjectMapper {
  static subjectCreateToCreationSubjectDto(subjectCreate: SubjectCreate): CreationSubjectDto {
    return new CreationSubjectDto(subjectCreate.name);
  }

  static subjectDtoToSubject(subjectDto: SubjectDto): Subject{
    return new Subject(
      subjectDto.id,
      subjectDto.name
    )
  }
}
