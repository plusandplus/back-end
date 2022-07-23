import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Category } from 'src/categories/category.entity';
import { Event } from 'src/events/event.entity';
import { Theme } from 'src/themes/theme.entity';
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
  minprice: number;

  @IsNotEmpty()
  @IsInt()
  maxprice: number;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  x: string;

  @IsNotEmpty()
  @IsString()
  y: string;

  @IsNotEmpty()
  @IsEnum(StationStatus)
  status: StationStatus;

  @IsNotEmpty()
  @IsInt()
  local_id: Category;

  @IsNotEmpty()
  @IsInt()
  stay_id: Category;

  @IsNotEmpty()
  themes: Theme[];

  @IsOptional()
  @IsInt()
  event_id: Event;
}
