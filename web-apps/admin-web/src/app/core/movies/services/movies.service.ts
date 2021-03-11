import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpProxyService } from '../../http-proxy.service';
import {
  CountryModel,
  LanguageModel,
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
    ADD_MOVIE: '',
    UPDATE_MOVIE: '',
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

  save(movieModel: MovieModel): Observable<any> {
    if (movieModel.id) {
      return this.http.put(this.endpoints.UPDATE_MOVIE, movieModel);
    } else {
      return this.http.put(this.endpoints.ADD_MOVIE, movieModel);
    }
  }
}
