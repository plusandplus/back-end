import { IsNotEmpty } from 'class-validator';
import { Room } from 'src/rooms/room.entity';
import { StationStatus } from '../station-status.enum';
export class CreateStationDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  image: string;
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  x: string;
  @IsNotEmpty()
  y: string;
  @IsNotEmpty()
  status: StationStatus;
}
