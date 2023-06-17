import {Group} from "../group/group";
import {Subject} from "../subject/subject";
import {Tag} from "../tag/tag";

export class VideoCreate {

  constructor(
    public title = "",
    public description = "",
    public recordingDateTime?: {year: number, month: number, day: number},
    public tags: Tag[] = [],
    public groupId = "",
    public subjectId = "",
    public videoFile?: File,
  ) {
  }
}
