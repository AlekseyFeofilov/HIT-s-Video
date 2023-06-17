import {Component, OnInit} from '@angular/core';
import {Group} from "../../../domain/models/group/group";
import {ActivatedRoute} from "@angular/router";
import {GroupAbstractService} from "../../../services/group/group.abstract.service";
import {SearchMemberDto} from "../../../domain/dtos/member/searchMemberDto";
import {MemberMapper} from "../../../helpers/mappers/memberMapper";
import {Member} from "../../../domain/models/member/member";
import {UserAbstractService} from "../../../services/user/user.abstract.service";
import {InvitationMapper} from "../../../helpers/mappers/invitationMapper";
import {Invitation} from "../../../domain/models/invitation/invitation";
import {CreationInvitationDto} from "../../../domain/dtos/invitation/creationInvitationDto";

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit {
  protected group: Group | undefined;
  protected members: Member[] = [];
  protected administrators: Member[] = [];

  protected myId = "";
  protected isAdmin = true; //todo добавить функционал админа
  protected isOwner = false; //todo добавить функционал овнера

  protected invitations: Invitation[] = [];

  private readonly groupId = "";
  protected usageLimit: number = 0;
  dateExpiration: {year: number, month: number, day: number} | undefined;

  constructor(private readonly route: ActivatedRoute,
              private readonly groupService: GroupAbstractService,
              private readonly userService: UserAbstractService,
  ) {
    this.groupId = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    let searchMemberDto = new SearchMemberDto("");

    this.userService.getAboutMe().subscribe({
      next: me => {
        this.myId = me.id
      }
    })

    this.groupService.getGroupMembers(searchMemberDto, this.groupId).subscribe({
      next: members => {
        this.members = members.content.map(MemberMapper.memberDtoToMember);
        this.administrators = this.members.filter(member => member.administrator)
      }
    })

    if (this.isAdmin) {
      this.groupService.getGroupInvitations(this.groupId).subscribe({
        next: invitations => {
          this.invitations = invitations.content.map(InvitationMapper.invitationDtoToInvitation)
        }
      })
    }
  }

  addInvitation() {
    let date: Date | undefined = undefined;

    if (this.dateExpiration !== undefined) {
      date = new Date(this.dateExpiration!.year, this.dateExpiration!.month, this.dateExpiration!.day);
    }

    let creationInvitation = new CreationInvitationDto(this.usageLimit, date)
    console.log(creationInvitation)
    this.groupService.createInvitation(creationInvitation, this.groupId).subscribe({
      next: _ => {
        this.groupService.getGroupInvitations(this.groupId).subscribe({
          next: invitations => {
            this.invitations = invitations.content.map(InvitationMapper.invitationDtoToInvitation)
          }
        })
      }
    })
  }
}
