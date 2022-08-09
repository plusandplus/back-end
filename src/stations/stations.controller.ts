import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CreateStationDto } from './dto/create-station.dto';
import { SearchStataionDto } from './dto/search-station.dto';
import { Station } from './station.entity';
import { StationStatus } from './station-status.enum';
import { StationsService } from './stations.service';
import { StationStatusValidationPipe } from './pipes/station-status-validation.pipe';
import { UpdateStationDto } from './dto/update-station.dto';

@Controller('stations')
export class StationsController {
  constructor(private stationsService: StationsService) {}

  // 숙소 목록 조회(admin 전용, status 필터링)
  @Get('/admin')
  async getAllStation(@Query() query: SearchStataionDto): Promise<Station[]> {
    const data = await this.stationsService.getAllByStatus(query);
    return Object.assign({
      statusCode: 200,
      message: `숙소 목록 조회(admin) 성공`,
      data,
    });
  }

  // 숙소 검색 (user 전용, 검색필터링)
  @Get('/search')
  async getSearchStation(
    @Query() query: SearchStataionDto,
  ): Promise<Station[]> {
    const data = await this.stationsService.getBySearch(query);
    console.log({ query });
    return Object.assign({
      statusCode: 200,
      message: `숙소 검색 성공`,
      data,
    });
  }

  @Get('/likes')
  async getStationByLikeCount(): Promise<Station[]> {
    const data = await this.stationsService.getStationByLikeCount();
    return Object.assign({
      statusCode: 200,
      message: '인기순 숙소 목록 조회 (5개)',
      data,
    });
  }

  @Get('/events/:id')
  async getStationByEventId(@Param('id') id: number): Promise<Station[]> {
    const data = await this.stationsService.getStationByEventId(id);
    return Object.assign({
      statusCode: 200,
      message: `이벤트 id별(${id}) 숙소 목록 조회`,
      data,
    });
  }

  @Get('/:id')
  async getStationById(@Param('id') id: number): Promise<Station> {
    const data = await this.stationsService.getStationById(id);
    return Object.assign({
      statusCode: 200,
      message: `숙소 조회 성공`,
      data,
    });
  }

  @Post('/')
  async createStation(
    @Body() createStationDto: CreateStationDto,
  ): Promise<Station> {
    const data = await this.stationsService.createStation(createStationDto);
    return Object.assign({
      statusCode: 201,
      message: `숙소 등록 성공`,
      data,
    });
  }

  @Patch('/:id')
  async updateStation(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStationDto: UpdateStationDto,
  ): Promise<UpdateStationDto> {
    const data = await this.stationsService.updateStation(id, updateStationDto);
    return Object.assign({
      statusCode: 200,
      message: `숙소 정보 수정 성공`,
      data,
    });
  }

  @Patch('/:id/status')
  async updateStationStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', StationStatusValidationPipe) status: StationStatus,
  ): Promise<Station> {
    const data = await this.stationsService.updateStationStatus(id, status);
    return Object.assign({
      statusCode: 200,
      message: `숙소 상태 업데이트 성공`,
      data,
    });
  }

  @Delete('/:id')
  deleteStation(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.stationsService.deleteStation(id);
  }
}
