import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsController } from './rooms.controller';
import { RoomRepository } from './rooms.repository';
import { RoomsService } from './rooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomRepository])],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
