import { Controller } from '@nestjs/common';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private likesServcie: LikesService) {}

  // 찜 등록

  // 찜 삭제

  // station별 찜 개수 조회

  // 유저별 숙소 찜 목록 조회
}
