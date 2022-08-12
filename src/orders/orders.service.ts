import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './orders.entity';
import { OrderRepository } from './order.repository';
import { RoomOrderDto } from './dto/room-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepository.getOrderAll();
  }

  async getOrderByUser(id: number): Promise<Order[]> {
    const found = await this.orderRepository.getOrderByUser(id);
    if (!found) {
      throw new NotFoundException(
        `해당 User의 id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }
    return found;
  }

  async getOrderById(id: number): Promise<Order> {
    const found = await this.orderRepository.getOrderById(id);
    if (!found) {
      throw new NotFoundException(
        `해당 order id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }
    return found;
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    await this.orderRepository.save(order);
    return order;
  }

  async updateOrder(id: number, update: Order): Promise<Order> {
    const result = await this.orderRepository.update(id, update);
    if (result.affected === 0) {
      throw new NotFoundException(
        `해당 order id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }
    return update;
  }
  async deleteOrder(id: number): Promise<void> {
    const result = await this.orderRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `해당 order id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }

    console.log('result', result);
  }

  getDatesStartToLast(startDate: string, lastDate: string) {
    const orderByDate: RoomOrderDto[] = [];

    // var regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
    // if(!(regex.test(startDate) && regex.test(lastDate))) return orderByDate;

    const curDate = new Date(startDate);
    while (curDate <= new Date(lastDate)) {
      orderByDate.push({
        date: new Date(curDate.toISOString().split('T')[0]),
        isOrdered: false,
      });
      curDate.setDate(curDate.getDate() + 1);
    }
    return orderByDate;
  }

  async getOrderByRoomId(
    id: number,
    from: string,
    to: string,
  ): Promise<RoomOrderDto[]> {
    const orderByDate: RoomOrderDto[] = this.getDatesStartToLast(from, to);

    await Promise.all(
      orderByDate.map(async (o) => {
        const found = await this.orderRepository.getOrderByRoomId(id, o.date);
        console.log(found);
        if (found) {
          o.isOrdered = true;
          console.log(o);
        }
      }),
    );

    return orderByDate;
  }
}
