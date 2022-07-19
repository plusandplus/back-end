import { userLevel } from './../auth/decorator/roles.decorator';
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
  Logger,
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
  private logger = new Logger('UsersController');
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
      res.redirect(
        `${process.env.CLIENT_HOST_NAME}/auth/kakao?accessToken=${req.user.accessToken}&refreshToken=${req.user.refreshToken}`,
      );
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
      res.redirect(
        `${process.env.CLIENT_HOST_NAME}/auth/naver?accessToken=${req.user.accessToken}&refreshToken=${req.user.refreshToken}`,
      );
    }
    res.end();
  }
  @UseGuards(JwtRefreshGuard)
  @Get('auth/refresh-accesstoken')
  async refreshAccessToken() {
    return { success: true, message: 'new accessToken Issuance success' };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(100)
  @Get('/')
  async getAllUse(@Req() req: any): Promise<User[]> {
    this.logger.verbose(`admin [${req.user.nickname}] check`);
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(10)
  @Get('/info')
  async getUserById(@Req() req: any): Promise<User> {
    if (req.user.id) {
      const user = await this.usersService.getUserById(req.user.id);
      return Object.assign({
        statusCode: 200,
        message: '유저 정보 조회 성공',
        data: { user },
      });
    } else {
      return Object.assign({
        statusCode: 200,
        message: '본인 정보만 확인할 수 있습니다.',
      });
    }
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(100)
  @Delete('/:id/ben')
  async benUser(@Param('id', ParseIntPipe) id): Promise<number> {
    const user = await this.usersService.benUser(id);
    return Object.assign({
      statusCode: 200,
      message: '유저 밴 성공',
      data: { user },
    });
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(10)
  @Patch('/')
  async updateUser(
    @Req() req: any,
    @Body('sex', UserSexValidationPipe) sex: userSEX,
    @Body('age', ParseIntPipe) age: number,
    @Body('phoneNumber') phoneNumber: string,
    @Body('firstSign') firstSign: boolean,
  ) {
    if (req.user.id) {
      return this.usersService.updateUser(
        req.user.id,
        sex,
        age,
        phoneNumber,
        firstSign,
      );
    } else {
      return Object.assign({
        statusCode: 200,
        message: '본인 정보만 확인할 수 있습니다.',
      });
    }
  }
}
