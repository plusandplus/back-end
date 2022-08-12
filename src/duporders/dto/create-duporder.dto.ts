import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDupOrderDto {
  //   @IsNotEmpty()
  //   @IsNumber()
  //   user_id: number;

  @IsNotEmpty()
  @IsNumber()
  room_id: number;

  @IsNotEmpty()
  //   @IsDate()
  start_date: Date;

  @IsNotEmpty()
  //   @IsDate()
  end_date: Date;
}
