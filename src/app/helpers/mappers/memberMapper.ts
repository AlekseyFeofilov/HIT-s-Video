import {MemberDto} from "../../domain/dtos/member/memberDto";
import {Member} from "../../domain/models/member/member";
import {UserMapper} from "./userMapper";

export class MemberMapper {
  static memberDtoToMember(memberDto: MemberDto): Member{
    return new Member(
      UserMapper.userDtoToUser(memberDto.user),
      memberDto.administrator
    )
  }
}
