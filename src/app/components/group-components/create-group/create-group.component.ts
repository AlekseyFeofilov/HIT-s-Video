import {Component} from '@angular/core';
import {GroupCreate} from "../../../domain/models/group/groupCreate";
import {GroupMapper} from "../../../helpers/mappers/groupMapper";
import {Router} from "@angular/router";
import {GroupAbstractService} from "../../../services/group/group.abstract.service";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent {
  protected groupCreate: GroupCreate = new GroupCreate("")

  constructor(private readonly groupService: GroupAbstractService,
              private readonly router: Router
  ) {
  }

  onSubmit() {
    let creationGroup = GroupMapper.groupCreateToCreationGroupDto(this.groupCreate);

    this.groupService.createGroup(creationGroup).subscribe({
        next: _ => {
          this.router.navigate([''])
        }
      }
    );
  }
}
