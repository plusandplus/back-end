import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { CreateDupOrderDto } from './dto/create-duporder.dto';
import { DeleteDupOrderDto } from './dto/delete-duporder.dto';
import { DupOrder } from './duporder.entity';
import { DupordersService } from './duporders.service';

@Controller('duporders')
export class DupordersController {
  constructor(private dupordersService: DupordersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(10)
  @Post('/')
  async createDupOrder(
    @Req() req: any,
    @Body() createDupOrderDTO: CreateDupOrderDto,
  ): Promise<DupOrder> {
    const data = await this.dupordersService.createDupOrder(
      req.user_id,
      createDupOrderDTO,
    );
    return Object.assign({
      statusCode: 201,
      message: `예약 시작 성공`,
      data,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(10)
  @Post('/delete')
  async deleteDupOrder(
    @Req() req: any,
    @Body() deleteDupOrderDto: DeleteDupOrderDto,
  ): Promise<void> {
    return this.dupordersService.deleteDupOrder(req.user_id, deleteDupOrderDto);
  }

  //   @Post('/')
  //   async createDupOrder(
  //     @Body() createDupOrderDTO: CreateDupOrderDto,
  //   ): Promise<DupOrder> {
  //     const data = await this.dupordersService.createDupOrder(createDupOrderDTO);
  //     return Object.assign({
  //       statusCode: 201,
  //       message: `예약 시작 성공`,
  //       data,
  //     });
  //   }

  //   @Post('/delete')
  //   async deleteDupOrder(
  //     @Body() deleteDupOrderDto: DeleteDupOrderDto,
  //   ): Promise<void> {
  //     return this.dupordersService.deleteDupOrder(deleteDupOrderDto);
  //   }
}
