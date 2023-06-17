import {Component} from '@angular/core';
import {SubjectCreate} from "../../../domain/models/subject/subjectCreate";
import {Router} from "@angular/router";
import {GroupMapper} from "../../../helpers/mappers/groupMapper";
import {SubjectMapper} from "../../../helpers/mappers/subjectMapper";
import {Group} from "../../../domain/models/group/group";
import {SearchGroupDto} from "../../../domain/dtos/group/searchGroupDto";
import {GroupAbstractService} from "../../../services/group/group.abstract.service";
import {SubjectAbstractService} from "../../../services/subject/subject.abstract.service";

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css']
})
export class CreateSubjectComponent {
  protected subjectCreate: SubjectCreate = new SubjectCreate("");
  protected groups: Group[] = [];

  constructor(private readonly subjectService: SubjectAbstractService,
              private readonly groupService: GroupAbstractService,
              private readonly router: Router
  ) {
  }

  onSubmit() {
    let creationSubject = SubjectMapper.subjectCreateToCreationSubjectDto(this.subjectCreate);

    this.subjectService.createSubject(creationSubject, "").subscribe({
        next: _ => {
          this.router.navigate([''])
        }
      }
    );

    let searchGroup = new SearchGroupDto("");

    this.groupService.getGroups(searchGroup).subscribe({
      next: groups => {
        this.groups = groups.content.map(GroupMapper.groupDtoToGroup);
      }
    })
  }
}
