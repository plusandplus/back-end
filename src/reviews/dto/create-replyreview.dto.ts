import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReplyReviewDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}
