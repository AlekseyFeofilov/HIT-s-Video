import {Group} from "../group/group";
import {Subject} from "../subject/subject";
import {Tag} from "../tag/tag";

export class Video {

  constructor(
    public id: string,
    public title: string,
    public description: string,
    public recordingDateTime: Date,
    public tags: Tag[],
    public group: Group,
    public subject: Subject,
    public playerUrl: URL
  ) {
  }
}
