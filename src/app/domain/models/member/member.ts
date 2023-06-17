import {UserDto} from "../../dtos/user/userDto";

export class Member {
  constructor(public user: UserDto,
              public administrator: boolean
  ) {
  }
}
