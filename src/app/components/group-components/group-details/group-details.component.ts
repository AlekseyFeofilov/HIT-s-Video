import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GroupAbstractService} from "../../../services/group/group.abstract.service";
import {Group} from "../../../domain/models/group/group";
import {SearchMemberDto} from "../../../domain/dtos/member/searchMemberDto";

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent {

}
