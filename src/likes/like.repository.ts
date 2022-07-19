import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Like } from './like.entity';

@EntityRepository(Like)
export class LikeRepository extends Repository<Like> {
  async getLikesByUser(id: number): Promise<Like[]> {
    const result = getRepository(Like)
      .createQueryBuilder('like')
      .select('station_id')
      .leftJoinAndSelect('like.station', 'station')
      .where(`like.user_id = ${id}`);
    return await result.getRawMany();
  }

  async getLikeCountByStation(id: number): Promise<object> {
    const result = await getRepository(Like)
      .createQueryBuilder('like')
      .select('COUNT(*) as like_cnt')
      .where(`like.station_id = ${id}`)
      .getRawOne();
    return result;
  }
}
