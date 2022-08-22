import { EntityRepository, getRepository, Repository } from 'typeorm';
import { SearchReviewDto } from './dto/search-review.dto';
import { Review } from './review.entity';

const REVIEW_TAKE = 10;

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
      .leftJoinAndSelect('order.station', 'station')
      .leftJoinAndSelect('order.room', 'room')
      .where('order.station = :stationId', { stationId })
      .orderBy('review.id', 'DESC')
      .limit(limit)
      .offset(offset)
      .getMany();
  }

  async getReviewsByUser(userId: number): Promise<Review[]> {
    return await getRepository(Review)
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.order', 'order')
      .leftJoinAndSelect('order.station', 'station')
      .leftJoinAndSelect('order.room', 'room')
      .leftJoinAndSelect('order.user', 'user')
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
      .leftJoinAndSelect('order.station', 'station')
      .leftJoinAndSelect('order.room', 'room')
      .where('review.id = :id', { id })
      .getOne();
  }

  async getReviewByOrderId(id: number): Promise<Review> {
    return await getRepository(Review)
      .createQueryBuilder('review')
      .where('review.order_id = :id', { id })
      .getOne();
  }
}
