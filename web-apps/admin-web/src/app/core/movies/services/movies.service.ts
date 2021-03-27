import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { cleanObject } from 'src/app/_shared/tools/object-tools';
import { environment } from 'src/environments/environment';

import { HttpProxyService } from '../../http-proxy.service';
import {
  CountryModel,
  EmptyMovieModel,
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
    COVER_PATH: (fileName: string) =>
      `${environment.apiUri}movies/cover/${fileName}`,
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
    return this.http
      .get<MovieListItemModel[]>(this.endpoints.SEARCH, {
        params: {
          ...cleanObject(filter),
        },
      })
      .pipe(
        map((result) =>
          result?.map((item) => {
            return {
              ...item,
              cover: this.endpoints.COVER_PATH(item.cover),
            };
          })
        )
      );
  }

  getMovie(id: string): Observable<MovieModel> {
    return this.http.get<MovieModel>(this.endpoints.GET_MOVIE(id));
  }

  uploadCover(fileToUpload: File): Observable<{ fileName: string }> {
    return;
  }
}

@Injectable({
  providedIn: 'root',
})
export class MovieCoverService {
  endpoints = {
    COVER_UPLOAD: 'movies/upload_cover',
  };

  constructor(private fileUploader: FileUploadService) {}

  upload(fileToUpload: File): Observable<{ fileName: string }> {
    return this.fileUploader.upload(
      this.endpoints.COVER_UPLOAD,
      fileToUpload,
      'cover'
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpProxyService) {}

  upload(
    endpoint: string,
    fileToUpload: File,
    formKey: string
  ): Observable<{ fileName: string }> {
    const formData = new FormData();
    formData.append(formKey, fileToUpload, fileToUpload.name);

    return this.http.postFormData<{ fileName: string }>(endpoint, formData);
  }
}
