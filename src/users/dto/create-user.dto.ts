import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { userRole, userSEX, userOauth } from '../user.model.enum';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  profile: string;

  @IsNotEmpty()
  @IsString()
  nickName: string;

  @IsNotEmpty()
  @IsEnum(userSEX)
  sex: userSEX;

  @IsNotEmpty()
  @IsInt()
  age: number;

  @IsNotEmpty()
  @IsEnum(userOauth)
  oauthName: userOauth;
}
