import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { cleanObject } from 'src/app/_shared/tools/object-tools';
import { environment } from 'src/environments/environment';

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
    LIST_OF_COUNTRIES: 'countries',
    LIST_OF_LANGUAGES: 'languages',
    LIST_OF_STUDIOS: 'studios',
    YEARS: 'movies/years',
    ADD_MOVIE: 'movies',
    DELETE_MOVIE: 'movies',
    UPDATE_MOVIE: 'movies',
    GET_MOVIE: (id) => `movies/${id}`,
    SEARCH: 'movies/search',
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

  save(movieModel: MovieModel): Observable<{ ok: true; message: string }> {
    if (movieModel.movieId) {
      return this.http.put(this.endpoints.UPDATE_MOVIE, movieModel);
    } else {
      return this.http.post(this.endpoints.ADD_MOVIE, movieModel);
    }
  }

  delete(movieId: string): Observable<{ ok: boolean }> {
    return this.http.delete(`${this.endpoints.DELETE_MOVIE}/${movieId}`);
  }

  search(filter: MovieFilterModel): Observable<MovieListItemModel[]> {
    return this.http.get<MovieListItemModel[]>(this.endpoints.SEARCH, {
      params: {
        ...cleanObject(filter),
      },
    });
  }

  getMovie(id: string): Observable<MovieModel> {
    return this.http.get<MovieModel>(this.endpoints.GET_MOVIE(id));
  }
}

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  constructor(private http: HttpProxyService) {}

  upload(fileToUpload: File): Observable<{ fileName: string }> {
    const formData = new FormData();
    formData.append('photo', fileToUpload, fileToUpload.name);

    return this.http.postFormData<{ fileName: string }>(
      'photos/upload',
      formData
    );
  }

  getUri(fileName: string): string {
    return `${environment.apiUri}photos/${fileName}`;
  }
}
