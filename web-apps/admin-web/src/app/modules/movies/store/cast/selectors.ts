import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MovieModuleState } from '../state';

const feature = createFeatureSelector<MovieModuleState>('movies');

export const castSelectors = {
  searchResult: createSelector(feature, (state) => state.cast.searchResult),
  newCastMember: createSelector(feature, (state) => state.cast.newCastMember),
  list: createSelector(feature, (state) => state.cast.list),
  addEditCastMember: createSelector(feature, (state) => state.cast.addEditCastMember)
};
