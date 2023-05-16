import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  genre: string;

  @IsNumber()
  @Min(1900)
  @Max(2023)
  year: number;

  @IsNumber()
  @Min(1)
  duration: number;
}
