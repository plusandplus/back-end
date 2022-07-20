import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './orders.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/')
  async getAllOrders(): Promise<Order[]> {
    const data = await this.ordersService.getAllOrders();
    return Object.assign({
      statusCode: 200,
      message: '오더 전체 목록 조회 성공',
      data,
    });
  }

  @Get('/user/:id')
  async getOrderByUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Order[]> {
    const data = await this.ordersService.getOrderByUser(id);
    return Object.assign({
      statusCode: 200,
      message: '유저 오더 조회 성공',
      data,
    });
  }
  @Get('/:id')
  async getOrderById(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    const data = await this.ordersService.getOrderById(id);
    return Object.assign({
      statusCode: 200,
      message: '오더 상세 조회 성공',
      data,
    });
  }

  @Post('/')
  async createEvent(@Body() createOrderDto: CreateOrderDto) {
    const data = await this.ordersService.createOrder(createOrderDto);
    return Object.assign({
      statusCode: 201,
      message: '오더 등록 성공',
      data,
    });
  }

  @Patch('/:id')
  async updateEvent(
    @Param('id', ParseIntPipe) id: number,
    @Body() update: Order,
  ) {
    const data = await this.ordersService.updateOrder(id, update);
    return Object.assign({
      statusCode: 200,
      message: '오더 정보 수정 성공',
      data,
    });
  }

  @Delete('/:id')
  deleteEvent(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.ordersService.deleteOrder(id);
  }
}
