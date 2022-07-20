import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { StationStatus } from '../station-status.enum';

export class SearchStataionDto {
  @IsEnum(StationStatus)
  @IsOptional()
  status: StationStatus = StationStatus.ACTIVE; // 활성화여부

  @IsString()
  @IsOptional()
  localId: number; // 지역

  @IsString()
  @IsOptional()
  stayIds: string; // 스테이유형

  @IsString()
  @IsOptional()
  themeIds: string; // 테마

  // 날짜
  @IsOptional()
  checkIn: Date; // 체크인날짜

  @IsOptional()
  checkOut: Date; //체크아웃날짜

  // 가격
  @IsOptional()
  minprice: number;
  @IsOptional()
  maxprice: number;

  // 페이지
  @IsOptional()
  page: number;
  @IsOptional()
  take: number;

  // 정렬(최신순, 가격낮은 순 등등 => 예정..)
}
