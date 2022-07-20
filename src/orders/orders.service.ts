import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './orders.entity';
import { OrderRepository } from './order.repository';

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
        `해당 이벤트 id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }
    return update;
  }
  async deleteOrder(id: number): Promise<void> {
    const result = await this.orderRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `해당 이벤트 id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }

    console.log('result', result);
  }
}
