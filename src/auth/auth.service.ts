import { userLevel } from './decorator/roles.decorator';
import * as CryptoJS from 'crypto-js';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { getConnection } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(profile: string): Promise<any> {
    const user = await this.usersService.getUserByProfile(profile);
    if (!user) {
      return null;
    }
    return user;
  }

  async createLoginToken(user: User) {
    const payload = {
      userId: user.id,
      userLevel: user.userLevel,
      userToken: 'loginToken',
    };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SCRECT_KEY,
      expiresIn: '250h',
    });
  }

  async createRefreshToken(user: User) {
    console.log(user);
    const payload = await {
      userId: user.id,
      userToken: 'refreshToken',
    };

    const token = await this.jwtService.sign(payload, {
      secret: process.env.JWT_SCRECT_KEY,
      expiresIn: '50m',
    });

    const refreshToken = await CryptoJS.AES.encrypt(
      JSON.stringify(token),
      process.env.AES_KEY,
    ).toString();

    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ userRefreshToken: token })
      .where(`id = ${user.id}`)
      .execute();
    return await refreshToken;
  }

  async signUp(userProfile: any) {
    const user = await this.usersService.createUser(userProfile);

    return user;
  }

  async tokenValidate(token: string) {
    return await this.jwtService.verify(token, {
      secret: process.env.JWT_SCRECT_KEY,
    });
  }
}
