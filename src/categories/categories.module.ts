import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationRepository } from 'src/stations/station.repository';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoryRepository } from './category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository, StationRepository])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
