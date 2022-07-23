import { OrderRepository } from './order.repository';
import { forwardRef, Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersService } from 'src/users/users.service';
import { UserRepository } from 'src/users/user.repository';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([OrderRepository, UserRepository]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, UsersService],
})
export class OrdersModule {}
