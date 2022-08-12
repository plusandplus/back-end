import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDupOrderDto } from './dto/create-duporder.dto';
import { DeleteDupOrderDto } from './dto/delete-duporder.dto';
import { DupOrder } from './duporder.entity';
import { DupOrderRepository } from './duporder.repository';

@Injectable()
export class DupordersService {
  constructor(
    @InjectRepository(DupOrderRepository)
    private dupOrderRepository: DupOrderRepository,
  ) {}

  async createDupOrder(
    user_id: number,
    createDupOrderDTO: CreateDupOrderDto,
  ): Promise<DupOrder> {
    const { room_id, start_date, end_date } = createDupOrderDTO;
    // db에서 겹치는 room_id, date로 insert 시도하면 중복 에러 throw
    const dupcheck = await this.dupOrderRepository.dupOrderCheck(
      room_id,
      start_date,
      end_date,
    );
    if (dupcheck) {
      throw new ConflictException(
        '이미 예약 중인 방입니다. 잠시 뒤 다시 시도해주십시오.',
      );
    }

    const duporder = this.dupOrderRepository.create({
      user_id,
      room_id,
      start_date,
      end_date,
    });
    await this.dupOrderRepository.save(duporder);
    return duporder;
  }

  async deleteDupOrder(
    user_id: number,
    deleteDupOrderDto: DeleteDupOrderDto,
  ): Promise<void> {
    const { room_id, start_date, end_date } = deleteDupOrderDto;
    const result = await this.dupOrderRepository.deleteDupOrder(
      user_id,
      room_id,
      start_date,
      end_date,
    );
    console.log('result', result);
  }

  //   async createDupOrder(
  //     createDupOrderDTO: CreateDupOrderDto,
  //   ): Promise<DupOrder> {
  //     const { user_id, room_id, start_date, end_date } = createDupOrderDTO;
  //     // db에서 겹치는 room_id, date로 insert 시도하면 중복 에러 throw
  //     const dupcheck = await this.dupOrderRepository.dupOrderCheck(
  //       room_id,
  //       start_date,
  //       end_date,
  //     );
  //     if (dupcheck) {
  //       throw new ConflictException('이미 진행중인 예약입니다.');
  //     }

  //     const duporder = this.dupOrderRepository.create({
  //       user_id,
  //       room_id,
  //       start_date,
  //       end_date,
  //     });
  //     await this.dupOrderRepository.save(duporder);
  //     return duporder;
  //   }

  //   async deleteDupOrder(deleteDupOrderDto: DeleteDupOrderDto): Promise<void> {
  //     const { user_id, room_id, start_date, end_date } = deleteDupOrderDto;
  //     const result = await this.dupOrderRepository.deleteDupOrder(
  //       user_id,
  //       room_id,
  //       start_date,
  //       end_date,
  //     );
  //     console.log('result', result);
  //   }
}
