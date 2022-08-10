import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StationRepository } from 'src/stations/station.repository';
import { CategoryClassification } from './category-classification.enum';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
    @InjectRepository(StationRepository)
    private stationRepository: StationRepository,
  ) {}

  async getCategoriesByClassification(
    classification: CategoryClassification,
  ): Promise<Category[]> {
    return await this.categoryRepository.getByClassification(classification);
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    await this.categoryRepository.save(category);
    return category;
  }

  async updateCategory(id: number, category: Category): Promise<Category> {
    const result = await this.categoryRepository.update(id, category);

    if (result.affected === 0) {
      throw new NotFoundException(
        `해당 카테고리 id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }

    return category;
  }

  // id로 카테고리 삭제
  async deleteCategory(id: number): Promise<void> {
    const category = await this.categoryRepository.findOne(id);
    // 해당 카테고리안에 숙소 데이터가 있으면 삭제 불가능
    const count = await this.stationRepository.getCountByCategoryId(
      id,
      category.classification,
    );
    if (!count) {
      throw new NotAcceptableException(
        `해당 카테고리 id(${id})에 숙소 데이터가 있습니다.`,
      );
    }

    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `해당 카테고리 id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }

    console.log('result', result);
  }
}
