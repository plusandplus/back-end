import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Room } from './room.entity';

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {
  async getAllByStationId(stationId: number): Promise<Room[]> {
    return await getRepository(Room)
      .createQueryBuilder('room')
      .where('room.station = :stationId', { stationId })
      .getMany();
  }

  async getOneById(roomId: number): Promise<Room> {
    return await getRepository(Room)
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.station', 'station')
      .leftJoinAndSelect('station.event', 'event')
      .where('room.id = :roomId', { roomId })
      .getOne();
  }

  async getStatusById(roomId: number): Promise<Room> {
    return await getRepository(Room)
      .createQueryBuilder('room')
      .select('room.status')
      .where('room.id = :roomId', { roomId })
      .getOne();
  }
}
