import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { userSEX } from '../user.model.enum';

export class UserSexValidationPipe implements PipeTransform {
  readonly SexOption = [userSEX.FEMALE, userSEX.MALE];

  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }

    return value;
  }

  private isStatusValid(sex: any) {
    const index = this.SexOption.indexOf(sex);
    return index !== -1;
  }
}
