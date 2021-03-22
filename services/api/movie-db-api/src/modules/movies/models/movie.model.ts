export class MovieModel {
  id: string;
  title: string;
  availableIn: { code: string; language: string }[];
  description: string;
  year: number;
  duration: number;
  countries: { id: string; name: string }[];
  studios: { id: string; name: string }[];
  director: string;
  imdb: { rating: number; url: string };
  cover: {
    fileName: string;
  };
}
