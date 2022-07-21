import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Order } from './orders.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  // 유저별 상세조회
  async getOrderByUser(id: number): Promise<Order[]> {
    return await getRepository(Order)
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user_id', 'user')
      .leftJoinAndSelect('order.station_id', 'station')
      .leftJoinAndSelect('order.room_id', 'room')
      .leftJoinAndSelect('order.event_id', 'event')
      .where('order.user_id =:id', { id })
      .getMany();
  }
  // 오더 상세조회
  async getOrderById(id: number): Promise<Order> {
    return await getRepository(Order)
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user_id', 'user')
      .leftJoinAndSelect('order.station_id', 'station')
      .leftJoinAndSelect('order.room_id', 'room')
      .leftJoinAndSelect('order.event_id', 'event')
      .where('order.id =:id', { id })
      .getOne();
  }
  // 관리자 전용 전체 오더 조회
  async getOrderAll(): Promise<Order[]> {
    return await getRepository(Order)
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user_id', 'user')
      .leftJoinAndSelect('order.station_id', 'station')
      .leftJoinAndSelect('order.room_id', 'room')
      .leftJoinAndSelect('order.event_id', 'event')
      .getMany();
  }

  async getOrderByRoomId(id: number, date: any): Promise<Order> {
    return await getRepository(Order)
      .createQueryBuilder('order')
      .leftJoin('order.room_id', 'room')
      .where('order.room_id = :id', { id })
      .andWhere(':date between order.start_date and order.end_date', { date })
      .andWhere(':date != order.end_date', { date })
      .getOne();
  }
}
