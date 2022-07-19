import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './event.entity';
import { EventRepository } from './event.repository';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventRepository)
    private eventRepository: EventRepository,
  ) {}

  async getAllEvents() {
    return await this.eventRepository.find();
  }

  async getEventById(id: number): Promise<Event> {
    const found = await this.eventRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(
        `해당 이벤트 id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }
    return found;
  }

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const event = this.eventRepository.create(createEventDto);
    await this.eventRepository.save(event);
    return event;
  }

  async updateEvent(id: number, event: Event): Promise<Event> {
    const result = await this.eventRepository.update(id, event);
    if (result.affected === 0) {
      throw new NotFoundException(
        `해당 이벤트 id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }
    return event;
  }
  async deleteEvent(id: number): Promise<void> {
    const result = await this.eventRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `해당 이벤트 id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }

    console.log('result', result);
  }
}
