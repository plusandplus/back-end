import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateThemeDto } from './dto/create-theme.dto';
import { Theme } from './theme.entity';
import { ThemeRepository } from './theme.repository';

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(ThemeRepository)
    private themeRepository: ThemeRepository,
  ) {}

  getAllThemes(): Promise<Theme[]> {
    return this.themeRepository.find();
  }

  async createTheme(createThemeDto: CreateThemeDto): Promise<Theme> {
    const theme = this.themeRepository.create(createThemeDto);
    await this.themeRepository.save(theme);
    return theme;
  }

  async updateTheme(id: number, theme: Theme): Promise<Theme> {
    const result = await this.themeRepository.update(id, theme);

    if (result.affected === 0) {
      throw new NotFoundException(
        `해당 테마 id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }

    return theme;
  }

  async deleteTheme(id: number): Promise<void> {
    const result = await this.themeRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `해당 테마 id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }

    console.log('result', result);
  }
}
