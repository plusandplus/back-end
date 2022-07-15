import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { userSEX, userOauth } from '../user.model.enum';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

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
