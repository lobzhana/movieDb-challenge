import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpProxyService } from '../../http-proxy.service';
import {
  CountryModel,
  LanguageModel,
  MovieFilterModel,
  MovieListItemModel,
  MovieModel,
  StudioModel,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  endpoints = {
    LIST_OF_COUNTRIES: 'assets/data/countries.json',
    LIST_OF_LANGUAGES: 'assets/data/movie-languages.json',
    LIST_OF_STUDIOS: 'assets/data/movie-studios.json',
    YEARS: 'assets/data/movie-years.json',
    ADD_MOVIE: '',
    UPDATE_MOVIE: '',
    SEARCH: 'assets/data/movie-search-result.json',
    COVER: (id: string) => `assets/covers/${id}.jpg`,
  };

  constructor(private http: HttpProxyService) {}

  getCountries(): Observable<CountryModel[]> {
    return this.http.get<CountryModel[]>(this.endpoints.LIST_OF_COUNTRIES);
  }

  getLanguages(): Observable<LanguageModel[]> {
    return this.http.get<LanguageModel[]>(this.endpoints.LIST_OF_LANGUAGES);
  }

  getStudios(): Observable<StudioModel[]> {
    return this.http.get<StudioModel[]>(this.endpoints.LIST_OF_STUDIOS);
  }

  getYears(): Observable<number[]> {
    return this.http.get<number[]>(this.endpoints.YEARS);
  }

  search(filter: MovieFilterModel): Observable<MovieListItemModel[]> {
    return this.http.get<MovieListItemModel[]>(this.endpoints.SEARCH).pipe(
      map((result) =>
        result?.map((item) => {
          return {
            ...item,
            coverUrl: this.endpoints.COVER(item.id),
          };
        })
      )
    );
  }

  save(movieModel: MovieModel): Observable<{ success: true; message: string }> {
    return of({ success: true, message: '' });

    if (movieModel.id) {
      return this.http.put(this.endpoints.UPDATE_MOVIE, movieModel);
    } else {
      return this.http.put(this.endpoints.ADD_MOVIE, movieModel);
    }
  }
}
