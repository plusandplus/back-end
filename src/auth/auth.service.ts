import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import CryptoJS from 'crypto-js';
import { getConnection } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      return null;
    }
    return user;
  }

  async createLoginToken(user: User) {
    const payload = {
      user_no: user.id,
      user_token: 'loginToken',
    };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SCRECT_KEY,
      expiresIn: '6m',
    });
  }

  async createRefreshToken(user: User) {
    const payload = {
      user_no: user.id,
      user_token: 'refreshToken',
    };

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SCRECT_KEY,
      expiresIn: '50m',
    });

    const refresh_token = CryptoJS.AES.encrypt(
      JSON.stringify(token),
      process.env.AES_KEY,
    ).toString();

    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ userRefreshToken: token })
      .where(`id = ${user.id}`)
      .execute();
    return refresh_token;
  }

  onceToken(user_profile: any) {
    const payload = {
      user_email: user_profile.user_email,
      user_nick: user_profile.user_nick,
      user_provider: user_profile.user_provider,
      user_token: 'onceToken',
    };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SCRECT_KEY,
      expiresIn: '10m',
    });
  }

  async tokenValidate(token: string) {
    return await this.jwtService.verify(token, {
      secret: process.env.JWT_SCRECT_KEY,
    });
  }
}
