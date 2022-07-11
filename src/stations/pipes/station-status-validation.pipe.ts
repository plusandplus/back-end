import { BadRequestException, PipeTransform } from '@nestjs/common';
import { StationStatus } from '../station-status.enum';

export class StationStatusValidationPipe implements PipeTransform {
  readonly StatusOption = [StationStatus.ACTIVE, StationStatus.DEACTIVE];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const index = this.StatusOption.indexOf(status);
    return index !== -1;
  }
}
