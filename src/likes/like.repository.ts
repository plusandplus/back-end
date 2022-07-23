import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Like } from './like.entity';

@EntityRepository(Like)
export class LikeRepository extends Repository<Like> {
  async getLikesByUser(id: number): Promise<Like[]> {
    const result = getRepository(Like)
      .createQueryBuilder('like')
      .select('station_id')
      .leftJoinAndSelect('like.station', 'station')
      .where('like.user_id = :id', { id });
    return await result.getRawMany();
  }

  async getLikeCountByStation(id: number): Promise<object> {
    const result = await getRepository(Like)
      .createQueryBuilder('like')
      .select('COUNT(*) as like_cnt')
      .where('like.station_id = :id', { id })
      .getRawOne();
    return result;
  }

  async deleteById(stationId: number, userId: number) {
    return await getRepository(Like)
      .createQueryBuilder('like')
      .delete()
      .from(Like)
      .where('like.station_id = :stationId', { stationId })
      .andWhere('like.user_id = :userId', { userId })
      .execute();
  }
}
