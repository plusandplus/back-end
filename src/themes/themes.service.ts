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

  // 테마 목록 조회
  async getAllThemes(): Promise<Theme[]> {
    return await this.themeRepository.find();
  }

  // 테마 등록
  async createThemes(createThemeDto: CreateThemeDto): Promise<Theme> {
    const theme = this.themeRepository.create(createThemeDto);
    await this.themeRepository.save(theme);
    return theme;
  }

  // id로 테마 정보 수정
  async updateThemes(id: number, theme: Theme): Promise<Theme> {
    const result = await this.themeRepository.update(id, theme);

    if (result.affected === 0) {
      throw new NotFoundException(
        `해당 테마 id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }

    return theme;
  }

  // id로 테마 삭제
  async deleteThemes(id: number): Promise<void> {
    const result = await this.themeRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `해당 테마 id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }

    console.log('result', result);
  }
}
