import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { OrderRepository } from 'src/orders/order.repository';
import { OrdersService } from 'src/orders/orders.service';
import { UserRepository } from 'src/users/user.repository';
import { UsersService } from 'src/users/users.service';
import { ReviewRepository } from './review.repository';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([
      ReviewRepository,
      OrderRepository,
      UserRepository,
    ]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService, UsersService, OrdersService],
})
export class ReviewsModule {}
