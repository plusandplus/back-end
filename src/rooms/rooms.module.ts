import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsController } from './rooms.controller';
import { RoomRepository } from './room.repository';
import { RoomsService } from './rooms.service';
import { StationRepository } from 'src/stations/station.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoomRepository, StationRepository])],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
