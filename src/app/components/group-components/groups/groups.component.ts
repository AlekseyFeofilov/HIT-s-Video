import {Component, OnInit} from '@angular/core';
import {GroupAbstractService} from "../../../services/group/group.abstract.service";
import {Group} from "../../../domain/models/group/group";
import {SearchGroupDto} from "../../../domain/dtos/group/searchGroupDto";
import {INT_MAX} from "../../../../constants/app.constants";
import {GroupMapper} from "../../../helpers/mappers/groupMapper";
import {JoiningGroupDto} from "../../../domain/dtos/invitation/joiningGroupDto";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  protected myGroups: Group[] = [];
  protected participatingGroups: Group[] = [];
  protected invitationCode = "";

  constructor(private readonly groupService: GroupAbstractService) {
  }

  ngOnInit() { // todo сделать пагинацию во всём проекте (скорее всего, этот проект заброситься после сдачи и никто никогда так и не увидит пагинацию нигде, кроме пагинации видео)
    let searchMyGroup = new SearchGroupDto("", true);
    let searchParticipatingGroup = new SearchGroupDto("");

    this.groupService.getGroups(searchMyGroup, 1, INT_MAX).subscribe({
      next: groups => {
        this.myGroups = groups.content.map(GroupMapper.groupDtoToGroup)
      }
    })

    this.groupService.getGroups(searchParticipatingGroup, 1, INT_MAX).subscribe({
      next: groups => {
        this.participatingGroups = groups.content.map(GroupMapper.groupDtoToGroup)
      }
    })
  }


  joinGroup() {
    let joiningGroup = new JoiningGroupDto(this.invitationCode);
    this.groupService.joinToGroup(joiningGroup).subscribe({
      next: _ => {
        let searchParticipatingGroup = new SearchGroupDto("");

        this.groupService.getGroups(searchParticipatingGroup, 1, INT_MAX).subscribe({
          next: groups => {
            this.participatingGroups = groups.content.map(GroupMapper.groupDtoToGroup)
          }
        })
      }
    })
  }
}
