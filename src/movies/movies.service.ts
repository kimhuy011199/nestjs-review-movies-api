import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { GetMoviesDto } from './dtos/get-movies.dto';

@Injectable()
export class MoviesService {
  constructor(@InjectRepository(Movie) private repo: Repository<Movie>) {}

  create(movieData: CreateMovieDto) {
    const movie = this.repo.create(movieData);
    return this.repo.save(movie);
  }

  async findOne(id: string) {
    const movie = await this.repo.findOneBy({ id: +id });

    if (!movie) {
      throw new NotFoundException();
    }

    return movie;
  }

  async findOneAndJoinColumn(id: string) {
    return this.repo
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.reviews', 'review')
      .where('id = :id', { id: +id })
      .andWhere('review.approved = :approved', { approved: true })
      .getMany();
  }

  async find({ title, genre, fromYear, toYear }: GetMoviesDto) {
    return this.repo
      .createQueryBuilder()
      .where(title ? 'title = :title' : '1=1', { title })
      .andWhere(genre ? 'genre = :genre' : '1=1', { genre })
      .andWhere(fromYear ? 'year >= :fromYear' : '1=1', { fromYear })
      .andWhere(toYear ? 'year <= :toYear' : '1=1', { toYear })
      .orderBy('year', 'DESC')
      .getMany();
  }

  async delete(id: string) {
    const movie = await this.findOne(id);
    await this.repo.remove(movie);
    return { id };
  }
}
