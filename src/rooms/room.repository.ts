import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Room } from './room.entity';

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {
  async getAllByStationId(stationId: number): Promise<Room[]> {
    return await getRepository(Room)
      .createQueryBuilder('room')
      // .leftJoinAndSelect('room.station_id', 'station')
      // .leftJoinAndSelect('station.event_id', 'event')
      .where('room.station_id = :stationId', { stationId })
      .getMany();
  }

  async getOneById(roomId: number): Promise<Room> {
    return await getRepository(Room)
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.station_id', 'station')
      .leftJoinAndSelect('station.event_id', 'event')
      .where('room.id = :roomId', { roomId })
      .getOne();
  }
}
