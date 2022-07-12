import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './room.entity';
import { RoomRepository } from './rooms.repository';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomRepository)
    private roomRepository: RoomRepository,
  ) {}

  // 숙소(station_idx)별 방 목록 조회
  async getAllRooms(stationId: number): Promise<Room[]> {
    const rooms = await getRepository(Room)
      .createQueryBuilder('room')
      .where('room.station_idx = :stationId', { stationId })
      .getMany();

    return rooms;
  }

  // id로 방 상세조회
  async getRoomById(id: number): Promise<Room> {
    const found = await this.roomRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(
        `해당 방 id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }
    return found;
  }

  // 방 등록
  async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    const room = this.roomRepository.create(createRoomDto);

    await this.roomRepository.save(room);
    return room;
  }
  // 방 정보 수정
  async updateRoom(id: number, room: Room): Promise<Room> {
    const result = await this.roomRepository.update(id, room);

    if (result.affected === 0) {
      throw new NotFoundException(
        `해당 방 id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }

    return room;
  }

  // 방 삭제
  async deleteRoom(id: number): Promise<void> {
    const result = await this.roomRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `해당 방 id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }

    console.log('result', result);
  }
}
