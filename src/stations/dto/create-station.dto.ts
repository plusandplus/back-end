import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { StationStatus } from '../station-status.enum';

export class CreateStationDto {
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
  @IsString()
  x: string;
  @IsNotEmpty()
  @IsString()
  y: string;
  @IsNotEmpty()
  @IsEnum(StationStatus)
  status: StationStatus;
}
