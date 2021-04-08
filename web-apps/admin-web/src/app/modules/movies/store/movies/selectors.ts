import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MovieModuleState } from '../state';

const feature = createFeatureSelector<MovieModuleState>('movies');

export const moviesSelectors = {
  list: createSelector(feature, (state) => state.listOfMovies),

  languages: createSelector(feature, (state) => state.languages),

  studios: createSelector(feature, (state) => state.studios),

  countries: createSelector(feature, (state) => state.countries),

  years: createSelector(feature, (state) => state.years),

  currentMovie: createSelector(feature, (state) => state.currentMovie),
};
