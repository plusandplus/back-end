import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Station } from 'src/stations/station.entity';
import { RoomStatus } from '../room-status.enum';

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
  @IsEnum(RoomStatus)
  status: RoomStatus;

  @IsNotEmpty()
  @IsString()
  checkin_time: string;

  @IsNotEmpty()
  @IsString()
  checkout_time: string;

  @IsNotEmpty()
  @IsInt()
  station_id: Station;
}
