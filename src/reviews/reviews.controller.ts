import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dtos/create-review.dto';
import { AuthenGuard } from 'src/auth/guards/authen.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  @UseGuards(AuthenGuard)
  @Post()
  create(@Body() body: CreateReviewDto, @CurrentUser() user: User) {
    return this.reviewService.create(body, user);
  }
}
