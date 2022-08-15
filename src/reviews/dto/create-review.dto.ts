import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Order } from 'src/orders/orders.entity';
import { Review } from '../review.entity';

export class CreateReviewDto {
  //   @IsNotEmpty()
  //   @IsString()
  //   nickname: string;

  @IsNotEmpty()
  @IsInt()
  rating: number;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  //   @IsOptional()
  //   @IsInt()
  //   review_id: Review;

  @IsNotEmpty()
  @IsInt()
  order_id: Order;
}
