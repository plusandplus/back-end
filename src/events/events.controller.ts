import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './event.entity';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get('/')
  async getAllEvents(): Promise<Event[]> {
    const data = await this.eventsService.getAllEvents();
    return Object.assign({
      statusCode: 200,
      message: '이벤트 목록 조회 성공',
      data,
    });
  }

  @Get('/:id')
  async getEventById(@Param('id', ParseIntPipe) id: number): Promise<Event> {
    const data = await this.eventsService.getEventById(id);
    return Object.assign({
      statusCode: 200,
      message: '이벤트 상세 조회 성공',
      data,
    });
  }

  @Post('/')
  async createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
    const data = await this.eventsService.createEvent(createEventDto);
    return Object.assign({
      statusCode: 201,
      message: '이벤트 등록 성공',
      data,
    });
  }

  @Patch('/:id')
  async updateEvent(
    @Param('id', ParseIntPipe) id: number,
    @Body() event: Event,
  ): Promise<Event> {
    const data = await this.eventsService.updateEvent(id, event);
    return Object.assign({
      statusCode: 200,
      message: '이벤트 정보 수정 성공',
      data,
    });
  }

  @Delete('/:id')
  deleteEvent(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.eventsService.deleteEvent(id);
  }
}
