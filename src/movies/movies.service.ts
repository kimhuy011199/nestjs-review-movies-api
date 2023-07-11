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
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  async findOneAndJoinColumn(id: string) {
    const movie = await this.repo
      .createQueryBuilder('movie')
      .leftJoinAndSelect(
        'movie.reviews',
        'review',
        'review.approved = :approved',
        { approved: true },
      )
      .where('movie.id = :id', { id: +id })
      .getOne();

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  async find({ title, genre, from, to }: GetMoviesDto) {
    return this.repo
      .createQueryBuilder()
      .where(title ? 'title = :title' : '1=1', { title })
      .andWhere(genre ? 'genre = :genre' : '1=1', { genre })
      .andWhere(from ? 'year >= :from' : '1=1', { from })
      .andWhere(to ? 'year <= :to' : '1=1', { to })
      .orderBy('year', 'DESC')
      .getMany();
  }

  async delete(id: string) {
    const movie = await this.findOne(id);
    await this.repo.remove(movie);
    return { id };
  }
}
