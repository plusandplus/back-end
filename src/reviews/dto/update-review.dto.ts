import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateReviewDto {
  @IsOptional()
  @IsInt()
  rating: number;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  content: string;
}
