import { BadRequestException, PipeTransform } from '@nestjs/common';
import { RoomStatus } from '../room-status.enum';

export class RoomStatusValidationPipe implements PipeTransform {
  readonly RoomOption = [RoomStatus.AVAILABLE, RoomStatus.PROGRESS];

  transform(value: any) {
    // value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const index = this.RoomOption.indexOf(status);
    return index !== -1;
  }
}
