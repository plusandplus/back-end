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
import { userOauth, userRole, userSEX } from './user.model.enum';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserSexValidationPipe } from './pipes/user-sex-validation.pipe';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('/')
  getAllUse(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }
  @Post('/')
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<User> {
    return this.usersService.getUserById(id);
  }
  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) id): Promise<void> {
    return this.usersService.deleteUser(id);
  }
  @Patch('/:id/first')
  updateUserFirst(
    @Param('id', ParseIntPipe) id: number,
    @Body('sex', UserSexValidationPipe) sex: userSEX,
    @Body('age', ParseIntPipe) age: number,
  ) {
    return this.usersService.updateUser(id, sex, age);
  }
}
