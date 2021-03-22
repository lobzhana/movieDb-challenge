import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovieListItemModel } from '../controllers/movies.controller';
import { MovieModel } from '../models/movie.model';
import { MovieDocument } from '../schema/movie.schema';
import { v4 as uuid } from 'uuid';
export class MoviesRepository {
  constructor(
    @InjectModel(MovieModel.name) private dbModel: Model<MovieDocument>,
  ) {}

  async search(filter: MovieFilterModel): Promise<MovieListItemModel[]> {
    const query = this.dbModel.find();
    const response = await query.exec();

    return response.map((item) => {
      return {
        id: item.id,
        title: item.title,
        description: item.description,
        year: item.year,
        duration: item.duration,
        cover: item.cover?.fileName,
        imdbRating: item.imdb?.rating,
      };
    });
  }

  async get(id: string): Promise<MovieModel> {
    return await this.dbModel.findOne({ id: id }).exec();
  }

  async save(movie: MovieModel): Promise<any> {
    if (movie.id) {
      await this.dbModel.updateOne({ id: movie.id }, { ...movie }).exec();
    } else {
      movie.id = uuid();
      await this.dbModel.create({
        ...movie,
      });
    }
  }

  async archive(id: string): Promise<any> {}
}

export interface MovieFilterModel {
  searchValue: string;
  availableIn: { code: string; language: string }[];
  years: number[];
  countries: { id: string; name: string }[];
  studios: { id: string; name: string }[];
  imdb: { from: number; to: number };
}
