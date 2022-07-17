import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import { RolesGuard } from './../auth/guard/roles.guard';
import { KakaoAuthGuard } from '../auth/guard/kakao-auth.guard';
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
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { userSEX } from './user.model.enum';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserSexValidationPipe } from './pipes/user-sex-validation.pipe';
import { AuthService } from 'src/auth/auth.service';
import { NaverAuthGuard } from 'src/auth/guard/naver-auth.guard';
import { JwtRefreshGuard } from 'src/auth/guard/jwt-refreshToken-auth.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(KakaoAuthGuard)
  @Get('auth/kakao')
  async kakaoLogin() {
    return;
  }
  @UseGuards(KakaoAuthGuard)
  @Get('auth/kakao/callback')
  async kakaoCallback(@Req() req: any, @Res() res: any): Promise<any> {
    if (req.user.type === 'login') {
      res.json({
        acessToken: req.user.accessToken,
        refreshToken: req.user.refreshToken,
      });
    }

    res.end();
  }
  @UseGuards(NaverAuthGuard)
  @Get('auth/naver')
  async naverlogin() {
    return;
  }

  @UseGuards(NaverAuthGuard)
  @Get('auth/naver/callback')
  async callback(@Req() req: any, @Res() res: any): Promise<any> {
    if (req.user.type === 'login') {
      res.json({
        acessToken: req.user.accessToken,
        refreshToken: req.user.refreshToken,
      });
    }
    res.end();
  }
  @UseGuards(JwtRefreshGuard)
  @Get('auth/refresh-accesstoken')
  async refreshAccessToken() {
    return { success: true, message: 'new accessToken Issuance success' };
  }
  @Roles(10)
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
