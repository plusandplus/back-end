import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStationDto } from './dto/create-station.dto';
import { StationStatus } from './station-status.enum';
import { Station } from './station.entity';
import { StationRepository } from './station.repository';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(StationRepository)
    private stationRepository: StationRepository,
  ) {}
  // 숙소 목록 조회
  async getAllStations(): Promise<Station[]> {
    return await this.stationRepository.find();
  }

  // id로 숙소 찾기
  async getStationById(id: number): Promise<Station> {
    const found = await this.stationRepository.findOne(id);
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

    await this.stationRepository.save(station);
    return station;
  }

  // 숙소 정보 수정
  async updateStation(id: number, station: Station): Promise<Station> {
    const result = await this.stationRepository.update(id, station);

    if (result.affected === 0) {
      throw new NotFoundException(
        `해당 숙소 id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }

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
