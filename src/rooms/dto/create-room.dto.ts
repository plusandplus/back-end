import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Station } from 'src/stations/station.entity';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsInt()
  price: number;

  @IsNotEmpty()
  @IsInt()
  max_cnt: number;

  @IsNotEmpty()
  station_idx: Station;
}
