import { Controller, Get } from '@nestjs/common';
import { StationsService } from './stations.service';

@Controller('stations')
export class StationsController {
  constructor(private stationsService: StationsService) {}

  @Get()
  getAllBoard() {
    return this.stationsService.findAll();
  }
}
