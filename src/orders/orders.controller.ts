import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './orders.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(100)
  @Get('/')
  async getAllOrders(): Promise<Order[]> {
    const data = await this.ordersService.getAllOrders();
    return Object.assign({
      statusCode: 200,
      message: '오더 전체 목록 조회 성공',
      data,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(10)
  @Get('/user')
  async getOrderByUser(@Req() req: any): Promise<Order[]> {
    const data = await this.ordersService.getOrderByUser(req.user.id);
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
