import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeRepository } from './like.repository';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from 'src/users/user.repository';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([LikeRepository, UserRepository]),
  ],
  controllers: [LikesController],
  providers: [LikesService, UsersService],
  exports: [LikesService],
})
export class LikesModule {}
