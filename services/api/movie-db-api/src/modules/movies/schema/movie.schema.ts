import { Document, Schema } from 'mongoose';
import { MovieModel } from '../models/movie.model';

export type MovieDocument = MovieModel & Document;
export const MovieSchema = new Schema(
  {
    id: String,
    title: String,
    availableIn: [{ id: String, name: String }],
    description: String,
    year: Number,
    duration: Number,
    countries: [{ code: String, name: String }],
    studios: [{ id: String, name: String }],
    director: String,
    imdb: { rating: Number, url: String },
    cover: { fileName: String },
    createdAt: Date,
  },
  {
    collection: 'movies',
  },
);
