import { User } from 'src/users/user.entity';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Station } from 'src/stations/station.entity';
import { Room } from 'src/rooms/room.entity';
import { Event } from 'src/events/event.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  //   @IsDate()
  start_date: Date;

  @IsNotEmpty()
  //   @IsDate()
  end_date: Date;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  SpecialRequest: string;

  @IsNotEmpty()
  @IsInt()
  user: User;

  @IsNotEmpty()
  @IsInt()
  station: Station;

  @IsNotEmpty()
  @IsInt()
  room: Room;

  @IsOptional()
  @IsInt()
  event: Event;
}
