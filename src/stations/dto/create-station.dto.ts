import { IsNotEmpty } from 'class-validator';
import { StationStatus } from '../station-status.enum';
export class CreateStationDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  image: string;
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  price: string;
  @IsNotEmpty()
  x: string;
  @IsNotEmpty()
  y: string;
  @IsNotEmpty()
  status: StationStatus;
}
