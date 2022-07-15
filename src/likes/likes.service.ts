import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeRepository } from './like.repository';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikeRepository)
    private likeRepository: LikeRepository,
  ) {}
}
