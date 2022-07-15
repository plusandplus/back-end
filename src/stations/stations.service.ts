import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Theme } from 'src/themes/theme.entity';
import { ThemeRepository } from 'src/themes/theme.repository';
import { CreateStationDto } from './dto/create-station.dto';
import { ReturnStationsDto } from './dto/return-stations.dto';
import { SearchStataionDto } from './dto/search-station.dto';
import { StationStatus } from './station-status.enum';
import { Station } from './station.entity';
import { StationRepository } from './station.repository';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(StationRepository)
    private stationRepository: StationRepository,
    @InjectRepository(ThemeRepository)
    private themeRepository: ThemeRepository,
  ) {}
  // 숙소 목록 조회(admin 전용, status 필터링)
  async getAllByStatus(query: SearchStataionDto): Promise<ReturnStationsDto> {
    return await this.stationRepository.getAll(query);
  }

  // 숙소 목록 조회(user 전용, 검색필터링)
  async getBySearch(query: SearchStataionDto): Promise<ReturnStationsDto> {
    return await this.stationRepository.getBySearch(query);
  }

  // id로 숙소 찾기
  async getStationById(id: number): Promise<Station> {
    const found = await this.stationRepository.getOne(id);
    if (!found) {
      throw new NotFoundException(
        `해당 숙소 id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }
    return found;
  }

  // 숙소 등록
  async createStation(createStationDto: CreateStationDto): Promise<Station> {
    const station = this.stationRepository.create(createStationDto);
    if (createStationDto.themes) {
      station.themes = await this.themeRepository.getAllById(
        createStationDto.themes,
      );
    }
    await this.stationRepository.save(station);
    return station;
  }

  // 숙소 정보 수정
  async updateStation(id: number, update: Station): Promise<Station> {
    const result = await this.stationRepository.update(id, update);
    if (result.affected === 0) {
      throw new NotFoundException(
        `해당 숙소 id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }

    return update;
  }

  // 숙소 테마 업데이트
  async updateStationTheme(id: number, themeIds: Theme[]): Promise<Station> {
    const station = await this.getStationById(id);
    station.themes = await this.themeRepository.getAllById(themeIds);

    await this.stationRepository.save(station);
    return station;
  }

  // 숙소 상태 업데이트
  async updateStationStatus(
    id: number,
    status: StationStatus,
  ): Promise<Station> {
    const station = await this.getStationById(id);

    station.status = status;
    await this.stationRepository.save(station);

    return station;
  }

  // 숙소 삭제
  async deleteStation(id: number): Promise<void> {
    const result = await this.stationRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `해당 숙소 id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }

    console.log('result', result);
  }
}
