import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeRepository } from './like.repository';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';

@Module({
  imports: [TypeOrmModule.forFeature([LikeRepository])],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
