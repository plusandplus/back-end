import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Station } from './station.entity';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(Station)
    private usersRepository: Repository<Station>,
  ) {}

  findAll(): Promise<Station[]> {
    return this.usersRepository.find();
  }
}
