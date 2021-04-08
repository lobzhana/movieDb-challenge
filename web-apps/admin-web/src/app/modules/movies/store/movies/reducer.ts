import { createReducer, on } from '@ngrx/store';
import { EmptyMovieModel } from 'src/app/core/movies/models';
import { defaultMovieModuleState, MovieModuleState } from '../state';
import { movieFormActions, moviesList, searchFilterActions } from './actions';

export const movieActionReducers = [
  on(searchFilterActions.apply, (state: MovieModuleState, action) => {
    return { ...state, searchFilter: { ...action.filter } };
  }),
  on(moviesList.set, (state: MovieModuleState, action) => {
    return {
      ...state,
      listOfMovies: action.movies,
    };
  }),
  on(searchFilterActions.setData, (state: MovieModuleState, action) => {
    return {
      ...state,
      languages: action.languages,
      studios: action.studios,
      countries: action.countries,
      years: action.years,
    };
  }),
  on(movieFormActions.initMovieForAdd, (state: MovieModuleState, action) => ({
    ...state,
    currentMovie: EmptyMovieModel(),
  })),
  on(movieFormActions.setCurrentMovie, (state: MovieModuleState, action) => {
    return {
      ...state,
      currentMovie: action.movie,
    };
  }),
  on(movieFormActions.setFormData, (state: MovieModuleState, action) => {
    return {
      ...state,
      languages: action.languages,
      studios: action.studios,
      countries: action.countries,
      years: action.years,
    };
  }),
];
