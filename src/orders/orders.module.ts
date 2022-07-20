import { OrderRepository } from './order.repository';
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrderRepository])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
