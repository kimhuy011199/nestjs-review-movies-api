import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { GetMoviesDto } from './dtos/get-movies.dto';
import { AuthenGuard } from 'src/auth/guards/authen.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/shared/enum/role.enum';

@Controller('movies')
export class MoviesController {
  constructor(private movieService: MoviesService) {}

  @UseGuards(AuthenGuard, RolesGuard)
  @Roles(Role.Staff)
  @Post()
  create(@Body() body: CreateMovieDto) {
    return this.movieService.create(body);
  }

  @Get()
  find(@Query() query: GetMoviesDto) {
    return this.movieService.find(query);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOneAndJoinColumn(id);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.movieService.delete(id);
  }
}
