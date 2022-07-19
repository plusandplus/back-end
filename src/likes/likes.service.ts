import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from './like.entity';
import { LikeRepository } from './like.repository';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikeRepository)
    private likeRepository: LikeRepository,
  ) {}

  async getLikesByUser(id: number): Promise<Like[]> {
    return this.likeRepository.getLikesByUser(id);
  }

  async getLikeCountByStation(id: number): Promise<object> {
    return this.likeRepository.getLikeCountByStation(id);
  }

  async createLike(createlikeDto: CreateLikeDto): Promise<Like> {
    const like = this.likeRepository.create(createlikeDto);
    await this.likeRepository.save(like);
    return like;
  }

  async deleteLike(id: number): Promise<void> {
    const result = await this.likeRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `해당 찜 id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }

    console.log('result', result);
  }
}
