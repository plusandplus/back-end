import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Theme } from './theme.entity';

@EntityRepository(Theme)
export class ThemeRepository extends Repository<Theme> {
  async getAllById(ids: Theme[]): Promise<Theme[]> {
    return await getRepository(Theme)
      .createQueryBuilder('theme')
      .where(`theme.id IN (${ids})`)
      .getMany();
  }
}
