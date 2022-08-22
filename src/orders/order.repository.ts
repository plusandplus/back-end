import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Order } from './orders.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  // 관리자 전용 전체 오더 조회
  async getOrderAll(): Promise<Order[]> {
    return await getRepository(Order)
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.station', 'station')
      .leftJoinAndSelect('order.room', 'room')
      .leftJoinAndSelect('order.event', 'event')
      .orderBy('order.id', 'DESC')
      .getMany();
  }

  // 유저별 상세조회
  async getOrderByUser(id: number): Promise<Order[]> {
    return await getRepository(Order)
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.station', 'station')
      .leftJoinAndSelect('order.room', 'room')
      .leftJoinAndSelect('order.event', 'event')
      .leftJoinAndSelect('order.review', 'review')
      .where('order.user =:id', { id })
      .where('order.id = review.order_id')
      .orderBy('order.id', 'DESC')
      .getMany();
  }

  // 오더 상세조회
  async getOrderById(id: number): Promise<Order> {
    return await getRepository(Order)
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.station', 'station')
      .leftJoinAndSelect('order.room', 'room')
      .leftJoinAndSelect('order.event', 'event')
      .where('order.id =:id', { id })
      .getOne();
  }

  async getOrderByRoomId(id: number, date: any): Promise<Order> {
    return await getRepository(Order)
      .createQueryBuilder('order')
      .leftJoin('order.room', 'room')
      .where('order.room = :id', { id })
      .andWhere(':date between order.start_date and order.end_date', { date })
      .andWhere(':date != order.end_date', { date })
      .getOne();
  }
}
