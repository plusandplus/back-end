import { PassportModule } from '@nestjs/passport';
import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { NaverStrategy } from './strategy/naver.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { KakaoStrategy } from './strategy/kakao.strategy';
import { StrategyModel } from './strategy/public.strategy.model';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.JWT_SCRECT_KEY,
    }),
  ],
  providers: [
    AuthService,
    NaverStrategy,
    JwtStrategy,
    KakaoStrategy,
    StrategyModel,
  ],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}
