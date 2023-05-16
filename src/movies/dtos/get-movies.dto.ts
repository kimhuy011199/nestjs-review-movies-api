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
  fromYear: number;

  @Transform(({ value }) => +value)
  @IsOptional()
  @IsNumber()
  toYear: number;
}
