import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Room } from './room.entity';

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {
  // 숙소(station_idx)별 방 목록 조회
  public async getAllByStationId(stationId: number) {
    const qb = getRepository(Room)
      .createQueryBuilder('room')
      .where('room.station_idx = :stationId', { stationId })
      .getMany();

    return qb;
  }
}
