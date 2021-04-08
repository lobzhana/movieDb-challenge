import { createAction, props } from '@ngrx/store';
import {
  CountryModel,
  LanguageModel,
  MovieFilterModel,
  MovieListItemModel,
  MovieModel,
  StudioModel,
} from 'src/app/core/movies/models';

const actionName = (name: string) => `[MOVIES] ${name}`;

export const searchFilterActions = {
  getData: createAction(actionName('Get Search Filter Data')),
  setData: createAction(
    actionName('Set Search Filter Data'),
    props<{
      languages: LanguageModel[];
      studios: StudioModel[];
      countries: CountryModel[];
      years: number[];
    }>()
  ),
  apply: createAction(
    actionName('Apply Search Filter'),
    props<{ filter: MovieFilterModel }>()
  ),
};

export const moviesList = {
  get: createAction(actionName('Get Movies List')),
  set: createAction(
    actionName('Set Movies List'),
    props<{ movies: MovieListItemModel[] }>()
  ),
};

export const deleteMovie = createAction(
  actionName('Delete Movie'),
  props<{ movieId: string }>()
);

export const movieFormActions = {
  getFormData: createAction(actionName('Get Movie Form Data')),
  setFormData: createAction(
    actionName('Set Movie Form Data'),
    props<{
      languages: LanguageModel[];
      studios: StudioModel[];
      countries: CountryModel[];
      years: number[];
    }>()
  ),
  initMovieForAdd: createAction(actionName('Init Movie For Add')),
  initMovieForEdit: createAction(
    actionName('Init Movie For Edit'),
    props<{ movieId: string }>()
  ),
  setCurrentMovie: createAction(
    actionName('Set Current Movie For Add/Edit'),
    props<{ movie: MovieModel }>()
  ),
  saveMovie: createAction(
    actionName('Save Movie'),
    props<{ movie: MovieModel }>()
  ),
};
