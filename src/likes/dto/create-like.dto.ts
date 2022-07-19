import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLikeDto {
  @IsNotEmpty()
  @IsNumber()
  station_id: number;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}
