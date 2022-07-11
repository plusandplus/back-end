import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateStationDto } from './dto/create-station.dto';
import { Station } from './station.entity';
import { StationStatus } from './station-status.enum';
import { StationsService } from './stations.service';
import { StationStatusValidationPipe } from './pipes/station-status-validation.pipe';

@Controller('stations')
export class StationsController {
  constructor(private stationsService: StationsService) {}

  @Get()
  async getAllStation(): Promise<Station[]> {
    const stations = await this.stationsService.getAllStations();
    return Object.assign({
      statusCode: 200,
      message: `숙소 목록 조회 성공`,
      data: stations,
    });
  }

  @Get('/:id')
  async getStationById(@Param('id') id: number): Promise<Station> {
    const station = await this.stationsService.getStationById(id);
    return Object.assign({
      statusCode: 200,
      message: `숙소 조회 성공`,
      data: station,
    });
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  async createStation(
    @Body() createStationDto: CreateStationDto,
  ): Promise<Station> {
    const station = await this.stationsService.createStation(createStationDto);
    return Object.assign({
      statusCode: 201,
      message: `숙소 등록 성공`,
      data: station,
    });
  }

  @Patch('/:id')
  async updateStation(
    @Param('id', ParseIntPipe) id: number,
    @Body() station: Station,
  ): Promise<Station> {
    const update = await this.stationsService.updateStation(id, station);
    return Object.assign({
      statusCode: 200,
      message: `숙소 정보 업데이트 성공`,
      data: update,
    });
  }

  @Patch('/:id/status')
  async updateStatioStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', StationStatusValidationPipe) status: StationStatus,
  ): Promise<Station> {
    const station = await this.stationsService.updateStationStatus(id, status);
    return Object.assign({
      statusCode: 200,
      message: `숙소 상태 업데이트 성공`,
      data: station,
    });
  }

  @Delete('/:id')
  async deleteStation(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.stationsService.deleteStation(id);
  }
}
