import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetMoviesDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  genre: string;

  @Transform(({ value }) => +value)
  @IsOptional()
  @IsNumber()
  from: number;

  @Transform(({ value }) => +value)
  @IsOptional()
  @IsNumber()
  to: number;
}
