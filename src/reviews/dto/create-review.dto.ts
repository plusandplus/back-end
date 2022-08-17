import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Order } from 'src/orders/orders.entity';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsInt()
  rating: number;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsInt()
  order_id: Order;
}
