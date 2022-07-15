import { EntityRepository, getRepository, Repository } from 'typeorm';
import { CategoryClassification } from './category-classification.enum';
import { Category } from './category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  // classification별 카테고리 목록 조회
  async getAllByClassification(
    classification: CategoryClassification,
  ): Promise<Category[]> {
    return await getRepository(Category)
      .createQueryBuilder('category')
      .where('category.classification = :classification', { classification })
      .getMany();
  }
}
