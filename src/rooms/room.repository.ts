import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Room } from './room.entity';

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {
  async getAllByStationId(stationId: number) {
    return await getRepository(Room)
      .createQueryBuilder('room')
      .where('room.station_id = :stationId', { stationId })
      .getMany();
  }
}
