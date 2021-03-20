import { Document, Schema } from 'mongoose';
import { MovieModel } from '../models/movie.model';


export type MovieDocument = MovieModel & Document;
export const MovieSchema = new Schema(
  {
    id: String,
    title: String,
    availableIn: [{ code: String, language: String }],
    description: String,
    year: Number,
    duration: Number,
    countries: [{ id: String, name: String }],
    studios: [{ id: String, name: String }],
    director: String,
    imdb: { rating: String, url: String },
  },
  {
    collection: 'movies',
  }
);
