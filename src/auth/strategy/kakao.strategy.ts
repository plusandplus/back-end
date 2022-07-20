import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-kakao';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { StrategyModel } from './public.strategy.model';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    private readonly authService: AuthService,
    private strategyModel: StrategyModel,
  ) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      callbackURL: process.env.KAKAO_REDIRECT_URL,
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    const userEmail = profile._json.kakao_account.email;
    const userNick = profile._json.properties.nickname;
    const userImage = profile._json.properties.profile_image;
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
