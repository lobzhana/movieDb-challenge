import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import {
  deleteMovie,
  moviesList,
  movieFormActions,
  searchFilterActions,
} from './actions';
import { map, mergeMap } from 'rxjs/operators';
import { MoviesService } from 'src/app/core/movies/services/movies.service';
import { forkJoin } from 'rxjs';
import { routerNavigate } from 'src/app/store/actions';
import { PATHS } from 'src/app/_shared/paths/paths';

@Injectable()
export class MoviesModuleEffects {
  constructor(private actions$: Actions, private service: MoviesService) {}

  applySearchFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchFilterActions.apply),
      mergeMap((action) => {
        return this.service
          .search(action.filter)
          .pipe(map((response) => moviesList.set({ movies: response })));
      })
    )
  );

  initSearchFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchFilterActions.getData),
      mergeMap(() =>
        forkJoin([
          this.service.getLanguages(),
          this.service.getStudios(),
          this.service.getCountries(),
          this.service.getYears(),
        ]).pipe(
          map(([languages, studios, countries, years]) => {
            return searchFilterActions.setData({
              languages,
              countries,
              studios,
              years,
            });
          })
        )
      )
    )
  );

  getMoviesList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(moviesList.get),
      mergeMap(() => {
        return this.service
          .search(null)
          .pipe(map((response) => moviesList.set({ movies: response })));
      })
    )
  );

  getMovieFormData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(movieFormActions.getFormData),
      mergeMap(() =>
        forkJoin([
          this.service.getLanguages(),
          this.service.getStudios(),
          this.service.getCountries(),
          this.service.getYears(),
        ]).pipe(
          map(([languages, studios, countries, years]) => {
            return movieFormActions.setFormData({
              languages,
              studios,
              countries,
              years,
            });
          })
        )
      )
    )
  );

  getMovieForEdit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(movieFormActions.initMovieForEdit),
      mergeMap((action) => {
        return this.service
          .getMovie(action.movieId)
          .pipe(
            map((response) =>
              movieFormActions.setCurrentMovie({ movie: response })
            )
          );
      })
    )
  );

  saveMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(movieFormActions.saveMovie),
      mergeMap((action) => {
        return this.service.save(action.movie).pipe(
          map((response) => {
            if (response.ok) {
              return routerNavigate({ uri: PATHS.MOVIES.LIST });
            } else {
              return routerNavigate({ uri: PATHS.MOVIES.LIST });
            }
          })
        );
      })
    )
  );

  deleteMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteMovie),
      mergeMap((action) => {
        return this.service
          .delete(action.movieId)
          .pipe(map(() => moviesList.get()));
      })
    )
  );
}
