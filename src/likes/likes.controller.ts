import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from './like.entity';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private likesServcie: LikesService) {}

  @Get('station/:id')
  async getLikeCountByStation(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    const data = await this.likesServcie.getLikeCountByStation(id);
    return Object.assign({
      statusCode: 200,
      message: `숙소별(${id}) 찜 개수 조회 성공`,
      data,
    });
  }

  @Get('/user/:id')
  async getLikesByUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const data = await this.likesServcie.getLikesByUser(id);
    return Object.assign({
      statusCode: 200,
      message: `유저별(${id}) 찜 목록 조회 성공`,
      data,
    });
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(10)
  @Post('/')
  // async createLike(@Req() req: any, @Body() stationId: number): Promise<Like> {
  // const data = await this.likesServcie.createLike(stationId, req.user.userId);
  async createLike(@Body() createlikeDto: CreateLikeDto): Promise<Like> {
    const data = await this.likesServcie.createLike(createlikeDto);
    return Object.assign({
      statusCode: 201,
      message: '찜 등록 성공',
      data,
    });
  }

  @Delete('/:id')
  deleteLike(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.likesServcie.deleteLike(id);
  }
}
