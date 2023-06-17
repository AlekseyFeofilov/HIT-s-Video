import {Component, EventEmitter, inject, Inject, OnInit, Output} from '@angular/core';
import {Group} from "../../../domain/models/group/group";
import {SearchGroupDto} from "../../../domain/dtos/group/searchGroupDto";
import {PageDtoGroupDto} from "../../../domain/dtos/group/pageDtoGroupDto";
import {GroupMapper} from "../../../helpers/mappers/groupMapper";
import {HttpClient} from "@angular/common/http";
import {GroupAbstractService} from "../../../services/group/group.abstract.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() selectGroupEvent = new EventEmitter<Group>();

  protected sidebarShow = false;

  protected groups: Group[] = [];
  protected parentGroups: Group[] = [];
  protected rootGroups: Group[] = [];

  protected currentGroup: Group | null = null;
  protected currentSubgroups: Group[] = [];

  constructor(private readonly groupService: GroupAbstractService, private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.groupService.getGroups(new SearchGroupDto("")).subscribe({
      next: (groups: PageDtoGroupDto) => {
        this.groups = groups.content.map(GroupMapper.groupDtoToGroup);

        this.rootGroups = this.groups.filter(it => {
          return <Group>this.groups.find(group => {
            return group.subgroupIds.includes(it.id)
          }) === undefined
        })

        this.currentSubgroups = this.rootGroups;
      }
    })
  }

  setGroup(id: string) {/**/
    if (this.currentGroup !== null) {
      this.parentGroups.push(this.currentGroup)
    }

    this.currentGroup = <Group>this.groups.find(group => group.id === id);
    this.selectGroupEvent.emit(this.currentGroup);
    this.setSubgroups();
  }

  setParentGroup() {
    this.currentGroup = this.parentGroups.pop() ?? null
    this.selectGroupEvent.emit(this.currentGroup!);
    this.setSubgroups();
  }

  private setSubgroups() {
    if (this.currentGroup !== null) {
      this.currentSubgroups = <Group[]>this.groups.filter(group => {
        return this.currentGroup!.subgroupIds.includes(group.id)
      });
    } else {
      this.currentSubgroups = this.rootGroups;
    }
  }
}
