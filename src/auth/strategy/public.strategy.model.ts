import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
@Injectable()
export class StrategyModel {
  constructor(private authService: AuthService) {}
  public async isSingUp(userProfile) {
    const userSingUp = await this.authService.signUp(userProfile);
    const accessToken = await this.authService.createLoginToken(userSingUp);
    const refreshToken = await this.authService.createRefreshToken(userSingUp);
    return { accessToken, refreshToken, type: 'login' };
  }
  public async isLogin(user) {
    const accessToken = await this.authService.createLoginToken(user);
    const refreshToken = await this.authService.createRefreshToken(user);
    return { accessToken, refreshToken, type: 'login' };
  }
}
