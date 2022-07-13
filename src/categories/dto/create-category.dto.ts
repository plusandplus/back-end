import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CategoryClassification } from '../category-classification.enum';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsEnum(CategoryClassification)
  classification: string;
}
