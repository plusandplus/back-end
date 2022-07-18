import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
@Injectable()
export class StrategyModel {
  constructor(private authService: AuthService) {}
  public async isSingUp(userProfile) {
    try {
      const userSingUp = await this.authService.signUp(userProfile);
      const accessToken = await this.authService.createLoginToken(userSingUp);
      const refreshToken = await this.authService.createRefreshToken(
        userSingUp,
      );
      return { accessToken, refreshToken, type: 'login' };
    } catch (error) {
      return new Error(error);
    }
  }
  public async isLogin(user) {
    try {
      const accessToken = await this.authService.createLoginToken(user);
      const refreshToken = await this.authService.createRefreshToken(user);
      return { accessToken, refreshToken, type: 'login' };
    } catch (error) {
      return new Error(error);
    }
  }
}
