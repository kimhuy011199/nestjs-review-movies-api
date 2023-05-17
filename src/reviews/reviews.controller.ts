import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dtos/create-review.dto';
import { AuthenGuard } from 'src/auth/guards/authen.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/shared/enum/role.enum';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  @UseGuards(AuthenGuard)
  @Post()
  create(@Body() body: CreateReviewDto, @CurrentUser() user: User) {
    return this.reviewService.create(body, user);
  }

  @UseGuards(AuthenGuard)
  @Roles(Role.Staff)
  @Patch('/:id')
  approveReview(@Body() body: { approved: boolean }, @Param('id') id: string) {
    return this.reviewService.update(id, body.approved);
  }

  @UseGuards(AuthenGuard)
  @Roles(Role.Admin)
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.reviewService.delete(id);
  }
}
