import {Group} from "../group/group";

export class SubjectCreate {
  constructor(
    public name: string,
    public group?: Group,
  ) {
  }
}
