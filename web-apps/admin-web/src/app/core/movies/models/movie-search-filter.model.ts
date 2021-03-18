export interface MovieFilterModel {
  searchValue: string;
  availableIn: { code: string; language: string }[];
  years: number[];
  countries: { id: string; name: string }[];
  studios: { id: string; name: string }[];
  imdb: { from: number; to: number };
}
