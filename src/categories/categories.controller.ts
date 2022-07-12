import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryClassification } from './category-classification.enum';
import { Category } from './category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('/:classification')
  async getAllCategories(
    @Param('classification') classification: CategoryClassification,
  ): Promise<Category[]> {
    const stations = await this.categoriesService.getAllCategories(
      classification,
    );
    return Object.assign({
      statusCode: 200,
      message: `${classification} 카테고리 목록 조회 성공`,
      data: stations,
    });
  }
}
