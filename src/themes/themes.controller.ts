import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateThemeDto } from './dto/create-theme.dto';
import { Theme } from './theme.entity';
import { ThemesService } from './themes.service';

@Controller('themes')
export class ThemesController {
  constructor(private themesService: ThemesService) {}

  @Get('')
  async getAllThemes(): Promise<Theme[]> {
    const data = await this.themesService.getAllThemes();
    return Object.assign({
      statusCode: 200,
      message: `테마 목록 조회 성공`,
      data,
    });
  }

  @Post('/')
  async createTheme(@Body() createThemeDto: CreateThemeDto): Promise<Theme> {
    const data = await this.themesService.createTheme(createThemeDto);
    return Object.assign({
      statusCode: 201,
      message: `테마 등록 성공`,
      data,
    });
  }

  @Patch('/:id')
  async updateTheme(
    @Param('id', ParseIntPipe) id: number,
    @Body() theme: Theme,
  ): Promise<Theme> {
    const data = await this.themesService.updateTheme(id, theme);
    return Object.assign({
      statusCode: 200,
      message: `테마 수정 성공`,
      data,
    });
  }

  @Delete('/:id')
  deleteTheme(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.themesService.deleteTheme(id);
  }
}
