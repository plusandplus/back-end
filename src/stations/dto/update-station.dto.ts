import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/categories/category.entity';
import { Event } from 'src/events/event.entity';
import { Theme } from 'src/themes/theme.entity';
import { StationStatus } from '../station-status.enum';

export class UpdateStationDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsInt()
  minprice: number;

  @IsOptional()
  @IsInt()
  maxprice: number;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  x: string;

  @IsOptional()
  @IsString()
  y: string;

  @IsOptional()
  @IsEnum(StationStatus)
  status: StationStatus;

  @IsOptional()
  @IsInt()
  local_id: Category;

  @IsOptional()
  @IsInt()
  stay_id: Category;

  @IsOptional()
  themes: Theme[];

  @IsOptional()
  @IsInt()
  event_id: Event;
}
