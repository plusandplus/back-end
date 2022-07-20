import { Strategy } from 'passport-naver';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { StrategyModel } from './public.strategy.model';
@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private strategyModel: StrategyModel,
  ) {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_CALLBACK_URL,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    const userEmail = profile._json.email;
    const userNick = profile._json.nickname;
    const userImage = profile._json.profile_image;
    const oauthId = profile._json.id;
    const userProvider = profile.provider;
    const userProfile = {
      email: userEmail,
      nickName: userNick,
      profile: userImage,
      oauthId: oauthId,
      oauthName: userProvider.toUpperCase(),
    };

    const user = await this.authService.validateUser(userImage);
    if (!user) {
      console.log('회원가입');
      return this.strategyModel.isSingUp(userProfile);
    }

    console.log('로그인 토큰 발급');
    return this.strategyModel.isLogin(user);
  }
}
