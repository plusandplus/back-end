import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ThemeRepository } from './theme.repository';

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(ThemeRepository)
    private themeRepository: ThemeRepository,
  ) {}

  // 테마 목록 조회

  // 테마 등록

  // id로 테마 정보 수정

  // id로 테마 삭제
}
