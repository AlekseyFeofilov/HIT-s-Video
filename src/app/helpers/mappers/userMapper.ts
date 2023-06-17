import {UserDto} from "../../domain/dtos/user/userDto";
import {User} from "../../domain/models/user/user";

export class UserMapper {
  static userDtoToUser(userDto: UserDto): User {
    return new User(
      userDto.id,
      userDto.vkId
    )
  }
}
