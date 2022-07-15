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
  @IsDate()
  @IsOptional()
  checkIn: Date; // 체크인날짜

  @IsDate()
  @IsOptional()
  checkOut: Date; //체크아웃날짜

  // 가격
  minprice: number;
  maxprice: number;

  // 페이지
  page: number;
  take: number;

  // 정렬(최신순, 가격낮은 순 등등 => 예정..)
}
