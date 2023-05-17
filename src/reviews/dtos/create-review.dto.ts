import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  content: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsNumber()
  movieId: number;
}
