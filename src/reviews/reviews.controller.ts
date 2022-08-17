import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { CreateReplyReviewDto } from './dto/create-replyreview.dto copy';
import { CreateReviewDto } from './dto/create-review.dto';
import { SearchReviewDto } from './dto/search-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './review.entity';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get('/station/:id')
  async getReviewsByStation(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: SearchReviewDto,
  ): Promise<Review[]> {
    const data = await this.reviewsService.getReviewsByStation(id, query);
    return Object.assign({
      statusCode: 200,
      message: `숙소 id(${id})별 리뷰 목록 조회 성공`,
      data,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(10)
  @Get('/user/:id')
  async getReviewsByUser(
    // @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
  ): Promise<Review[]> {
    const data = await this.reviewsService.getReviewsByUser(req.user.id);
    // const data = await this.reviewsService.getReviewsByUser(id);
    return Object.assign({
      statusCode: 200,
      message: `유저 id(${req.user.id})별 리뷰 목록 조회 성공`,
      data,
    });
  }

  @Get('/:id')
  async getReviewById(@Param('id', ParseIntPipe) id: number): Promise<Review> {
    const data = await this.reviewsService.getReviewById(id);
    return Object.assign({
      statusCode: 200,
      message: `리뷰 상세 조회 성공`,
      data,
    });
  }

  @Post('')
  async createReview(
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    const data = await this.reviewsService.createReview(createReviewDto);
    return Object.assign({
      statusCode: 201,
      message: `리뷰 등록 성공`,
      data,
    });
  }

  @Post('/:id')
  async createReplyReview(
    @Param('id', ParseIntPipe) id: number,
    @Body() createReplyReviewDto: CreateReplyReviewDto,
  ): Promise<Review> {
    const data = await this.reviewsService.createReplyReview(
      id,
      createReplyReviewDto,
    );
    return Object.assign({
      statusCode: 201,
      message: `리뷰 답글 등록 성공`,
      data,
    });
  }

  @Patch('/:id')
  async updateReview(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    const data = await this.reviewsService.updateReview(id, updateReviewDto);
    return Object.assign({
      statusCode: 200,
      message: `리뷰 수정 성공`,
      data,
    });
  }

  @Delete('/:id')
  deleteReview(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.reviewsService.deleteReview(id);
  }
}
