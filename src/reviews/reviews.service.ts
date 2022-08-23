import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersService } from 'src/orders/orders.service';
import { UserRepository } from 'src/users/user.repository';
import { CreateReplyReviewDto } from './dto/create-replyreview.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { SearchReviewDto } from './dto/search-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './review.entity';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewRepository)
    private reviewRepository: ReviewRepository,
    private orderService: OrdersService,
    private userRepository: UserRepository,
  ) {}
  async getReviewsByStation(
    stationId: number,
    query: SearchReviewDto,
  ): Promise<Review[]> {
    return this.reviewRepository.getReviewsByStation(stationId, query);
  }

  async getReviewsByUser(userId: number): Promise<Review[]> {
    return this.reviewRepository.getReviewsByUser(userId);
  }

  async getReviewById(id: number): Promise<Review> {
    const found = await this.reviewRepository.getReviewById(id);
    if (!found) {
      throw new NotFoundException(
        `해당 리뷰 id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }
    return found;
  }

  async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
    const { rating, image, content, order_id } = createReviewDto;

    // 같은 order에 review 달 수 없도록 중복처리
    const IsOrder = await this.reviewRepository.getReviewByOrderId(
      Number(order_id),
    );
    if (IsOrder) {
      throw new ConflictException('이미 리뷰를 등록했습니다.');
    }

    // order_id로 user_id, nickname 구해서 저장
    const order = await this.orderService.getOrderById(Number(order_id));
    // const { user_id, station_id, room_id } = order;
    const { nickName } = await this.userRepository.findOne(
      Number(order.user.id),
    );

    const review = this.reviewRepository.create({
      nickname: nickName,
      rating,
      image,
      content,
      order,
    });
    await this.reviewRepository.save(review);
    return review;
  }

  async createReplyReview(
    id: number,
    createReplyReviewDto: CreateReplyReviewDto,
  ): Promise<Review> {
    const { content } = createReplyReviewDto;
    const replyreview = this.reviewRepository.create({
      nickname: '관리자',
      content,
    });

    await this.reviewRepository.save(replyreview);
    return replyreview;
  }

  async updateReview(
    id: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<UpdateReviewDto> {
    const result = await this.reviewRepository.update(id, updateReviewDto);
    if (result.affected === 0) {
      throw new NotFoundException(
        `해당 리뷰 id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }

    return updateReviewDto;
  }

  async deleteReview(id: number): Promise<void> {
    const result = await this.reviewRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `해당 리뷰 id(${id})가 없습니다. 다시 한 번 확인해 주세요.`,
      );
    }

    console.log('result', result);
  }
}
