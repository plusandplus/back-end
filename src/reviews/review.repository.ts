import { EntityRepository, getRepository, Repository } from 'typeorm';
import { SearchReviewDto } from './dto/search-review.dto';
import { Review } from './review.entity';

const REVIEW_TAKE = 3;

@EntityRepository(Review)
export class ReviewRepository extends Repository<Review> {
  async getReviewsByStation(
    stationId: number,
    query: SearchReviewDto,
  ): Promise<Review[]> {
    const { take, page } = query;
    const limit = take ?? REVIEW_TAKE;
    const offset = page ? limit * (page - 1) : 0;

    return await getRepository(Review)
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.order', 'order')
      .leftJoinAndSelect('order.station_id', 'station')
      .leftJoinAndSelect('order.room_id', 'room')
      .where('order.station_id = :stationId', { stationId })
      .orderBy('review.id', 'DESC')
      .limit(limit)
      .offset(offset)
      .getMany();
  }

  async getReviewsByUser(userId: number): Promise<Review[]> {
    return await getRepository(Review)
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.order', 'order')
      .leftJoinAndSelect('order.station_id', 'station')
      .leftJoinAndSelect('order.room_id', 'room')
      .leftJoinAndSelect('order.user_id', 'user')
      .where('user.id = :userId', { userId })
      .orderBy('review.id', 'DESC')
      //   .limit(limit)
      //   .offset(offset)
      .getMany();
  }

  async getReviewById(id: number): Promise<Review> {
    return await getRepository(Review)
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.order', 'order')
      .leftJoinAndSelect('order.station_id', 'station')
      .leftJoinAndSelect('order.room_id', 'room')
      .where('review.id = :id', { id })
      .getOne();
  }
}
