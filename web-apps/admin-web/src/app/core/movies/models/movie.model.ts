import { FileModel } from '../../models/file.model';

export interface MovieModel {
  movieId: string;
  title: string;
  availableIn: { code: string; language: string }[];
  description: string;
  year: number;
  duration: number;
  countries: { code: string; name: string }[];
  studios: { uId: string; name: string }[];
  director: string;
  imdb: { rating: number; url: string };
  cover: { fileName: string };
}

export function EmptyMovieModel(): MovieModel {
  return {
    movieId: '',
    title: '',
    availableIn: [],
    description: '',
    year: 0,
    duration: 0,
    countries: [],
    studios: [],
    director: '',
    imdb: { rating: 0, url: '' },
    cover: null,
  };
}
