import {InvitationDto} from "../../domain/dtos/invitation/invitationDto";
import {Invitation} from "../../domain/models/invitation/invitation";

export class InvitationMapper {
  static invitationDtoToInvitation(invitationDto: InvitationDto): Invitation{
    return new Invitation(
      invitationDto.id,
      invitationDto.code,
      invitationDto.usages,
      invitationDto.usageLimit,
      invitationDto.expirationDateTime
    )
  }
}
