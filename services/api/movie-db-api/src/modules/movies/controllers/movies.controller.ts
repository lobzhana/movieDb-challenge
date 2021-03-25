import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { CountryModel } from '../models/country.model';
import { LanguageModel } from '../models/language.model';
import { MovieModel } from '../models/movie.model';
import { StudioModel } from '../models/studio.model';
import { CountriesRepository } from '../repositories/countries.repository';
import { LanguagesRepository } from '../repositories/languages.repository';
import {
  MovieFilterModel,
  MoviesRepository,
} from '../repositories/movies.repository';
import { StudiosRepository } from '../repositories/studios.repository';
@Controller('movies')
export class MoviesController {
  constructor(
    private studiosRepository: StudiosRepository,
    private languageRepository: LanguagesRepository,
    private countryRepository: CountriesRepository,
    private moviesRepository: MoviesRepository,
  ) {}

  @Get('countries')
  async getCountries(): Promise<CountryModel[]> {
    return await this.countryRepository.getAll();
  }

  @Get('languages')
  async getLanguages(): Promise<LanguageModel[]> {
    return await this.languageRepository.getAll();
  }

  @Get('studios')
  async getStudios(): Promise<StudioModel[]> {
    return await this.studiosRepository.getAll();
  }

  @Get('years')
  getYears(): number[] {
    return [1990, 1995, 2000, 2005, 2010, 2015, 2020, 2021];
  }

  @Post()
  async create(@Body() movie: MovieModel): Promise<any> {
    console.log('received new movie:');
    console.log(movie);
    return await this.moviesRepository.save(movie);
  }

  @Put()
  async update(@Body() movie: MovieModel): Promise<any> {
    console.log('received movie for update:');
    console.log(movie);
    return await this.moviesRepository.save(movie);
  }

  @Delete(':movieId')
  async delete(@Param('movieId') movieId: string): Promise<any> {
    return await this.moviesRepository.delete(movieId);
  }

  @Get('search')
  async search(
    @Query() filter: MovieFilterModel,
  ): Promise<MovieListItemModel[]> {
    console.log('search requested with filters: ');
    console.log(filter);

    return await this.moviesRepository.search(filter);
  }

  @Get(':id')
  async getMovie(@Param('id') id: string): Promise<MovieModel> {
    const response = await this.moviesRepository.get(id);

    console.log(response);

    return response;
  }
}

export interface MovieListItemModel {
  id: string;
  title: string;
  description: string;
  year: number;
  duration: number;
  imdbRating: number;
  cover?: string;
}
