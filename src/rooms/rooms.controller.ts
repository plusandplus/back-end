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
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './room.entity';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Get('/station/:id')
  async getAllRoom(@Param('id', ParseIntPipe) id: number): Promise<Room[]> {
    const data = await this.roomsService.getAllRooms(id);
    return Object.assign({
      statusCode: 200,
      message: `숙소 id(${id})별 방 목록 조회 성공`,
      data,
    });
  }

  @Get('/:id')
  async getRoomById(@Param('id', ParseIntPipe) id: number): Promise<Room> {
    const data = await this.roomsService.getRoomById(id);
    return Object.assign({
      statusCode: 200,
      message: `방 정보 조회 성공`,
      data,
    });
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  async createRoom(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
    const data = await this.roomsService.createRoom(createRoomDto);
    return Object.assign({
      statusCode: 201,
      message: `방 등록 성공`,
      data,
    });
  }

  @Patch('/:id')
  async updateRoom(
    @Param('id', ParseIntPipe) id: number,
    @Body() room: Room,
  ): Promise<Room> {
    const data = await this.roomsService.updateRoom(id, room);
    return Object.assign({
      statusCode: 200,
      message: `방 정보 수정 성공`,
      data,
    });
  }

  @Delete('/:id')
  deleteRoom(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.roomsService.deleteRoom(id);
  }
}
