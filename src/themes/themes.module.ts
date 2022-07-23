import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemeRepository } from './theme.repository';
import { ThemesController } from './themes.controller';
import { ThemesService } from './themes.service';

@Module({
  imports: [TypeOrmModule.forFeature([ThemeRepository])],
  controllers: [ThemesController],
  providers: [ThemesService],
})
export class ThemesModule {}
