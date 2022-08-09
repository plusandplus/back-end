import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomStatus } from './room-status.enum';
import { Room } from './room.entity';
import { RoomRepository } from './room.repository';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomRepository)
    private roomRepository: RoomRepository,
  ) {}

  getAllRooms(stationId: number): Promise<Room[]> {
    return this.roomRepository.getAllByStationId(stationId);
  }

  async getRoomById(id: number): Promise<Room> {
    const found = await this.roomRepository.getOneById(id);
    if (!found) {
      throw new NotFoundException(
        `해당 방 id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }
    return found;
  }

  async getRoomStatusById(id: number): Promise<Room> {
    const found = await this.roomRepository.getStatusById(id);
    if (!found) {
      throw new NotFoundException(
        `해당 방 id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }
    return found;
  }

  async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    const room = this.roomRepository.create(createRoomDto);

    await this.roomRepository.save(room);
    return room;
  }

  async updateRoom(id: number, room: Room): Promise<Room> {
    const result = await this.roomRepository.update(id, room);

    if (result.affected === 0) {
      throw new NotFoundException(
        `해당 방 id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }

    return room;
  }

  async updateRoomStatus(id: number, status: RoomStatus): Promise<RoomStatus> {
    const room = await this.getRoomById(id);

    room.status = status;
    await this.roomRepository.save(room);

    return status;
  }

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
