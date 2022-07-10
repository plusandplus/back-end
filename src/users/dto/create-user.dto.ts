import { IsNotEmpty } from 'class-validator';
import { userRole, userSEX, userOauth } from '../user.model.enum';
export class CreateUserDto {
  @IsNotEmpty()
  profile: String;
  @IsNotEmpty()
  nickName: String;
  @IsNotEmpty()
  sex: userSEX;
  @IsNotEmpty()
  age: Number;
  @IsNotEmpty()
  oauthName: userOauth;
}
