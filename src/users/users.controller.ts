import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { userSEX } from './user.model.enum';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserSexValidationPipe } from './pipes/user-sex-validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  async getAllUse(): Promise<User[]> {
    const users = await this.usersService.getAllUsers();
    return Object.assign({
      stautsCode: 200,
      message: '유저 전체 목록 조회 성공',
      data: users,
    });
  }

  @Post('/')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Get('/:id')
  async getBoardById(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.getUserById(id);
    return Object.assign({
      statusCode: 200,
      message: '유저 정보 조회 성공',
      data: { user },
    });
  }

  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id): Promise<number> {
    const user = await this.usersService.deleteUser(id);
    return Object.assign({
      statusCode: 200,
      message: '유저 삭제 성공',
      data: { user_idx: id },
    });
  }

  @Patch('/:id/first')
  updateUserFirst(
    @Param('id', ParseIntPipe) id: number,
    @Body('sex', UserSexValidationPipe) sex: userSEX,
    @Body('age', ParseIntPipe) age: number,
    @Body('phoneNumber') phoneNumber: string,
  ) {
    return this.usersService.updateUser(id, sex, age, phoneNumber);
  }
}
