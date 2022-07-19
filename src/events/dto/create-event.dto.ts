import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  //   @IsDate()
  start_date: Date;

  @IsNotEmpty()
  //   @IsDate()
  end_date: Date;

  @IsNotEmpty()
  @IsNumber()
  rate: number;
}
