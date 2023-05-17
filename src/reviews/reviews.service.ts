import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dtos/create-review.dto';
import { User } from 'src/users/user.entity';
import { MoviesService } from 'src/movies/movies.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    private movieServce: MoviesService,
  ) {}

  async create(reviewData: CreateReviewDto, user: User) {
    const { movieId, ...data } = reviewData;
    const review = this.reviewRepository.create(data);
    const movie = await this.movieServce.findOne(movieId.toString());
    review.user = user;
    review.movie = movie;
    return this.reviewRepository.save(review);
  }
}
