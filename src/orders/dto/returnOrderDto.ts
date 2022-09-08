import { Order } from '../orders.entity';

export class ReturnOrderDto {
  complete: Order[];
  future: Order[];
}
