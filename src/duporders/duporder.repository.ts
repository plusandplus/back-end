import { EntityRepository, getRepository, Repository } from 'typeorm';
import { DupOrder } from './duporder.entity';

@EntityRepository(DupOrder)
export class DupOrderRepository extends Repository<DupOrder> {
  async dupOrderCheck(
    room_id: number,
    start_date: Date,
    end_date: Date,
  ): Promise<DupOrder> {
    return await getRepository(DupOrder)
      .createQueryBuilder('dup')
      .where('dup.room_id = :room_id', { room_id })
      .andWhere(':start_date < dup.end_date', { start_date })
      .andWhere(':end_date >= dup.start_date', { end_date })
      .getOne();
  }

  async deleteDupOrder(
    user_id: number,
    room_id: number,
    start_date: Date,
    end_date: Date,
  ) {
    return await getRepository(DupOrder)
      .createQueryBuilder()
      .delete()
      .from(DupOrder)
      .where('user_id = :user_id', { user_id })
      .andWhere('room_id = :room_id', { room_id })
      .andWhere(':start_date < end_date', { start_date })
      .andWhere(':end_date >= start_date', { end_date })
      .execute();
  }
}
