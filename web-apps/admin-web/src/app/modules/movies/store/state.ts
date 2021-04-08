import {
  CountryModel,
  LanguageModel,
  MovieFilterModel,
  MovieListItemModel,
  MovieModel,
  StudioModel,
} from 'src/app/core/movies/models';
import { CastMemberModel } from 'src/app/core/movies/models/cast-member.model';

export interface MovieModuleState {
  searchFilter: MovieFilterModel;
  listOfMovies: MovieListItemModel[];
  languages: LanguageModel[];
  studios: StudioModel[];
  countries: CountryModel[];
  years: number[];
  currentMovie?: MovieModel;
  cast: {
    searchResult: CastMemberModel[];
    addEditCastMember?: CastMemberModel;
    newCastMember?: CastMemberModel;
    list: CastMemberModel[];
  };
}

export const defaultMovieModuleState: MovieModuleState = {
  searchFilter: null,
  listOfMovies: [],
  countries: [],
  languages: [],
  studios: [],
  years: [],
  cast: { searchResult: [], list: [] },
};
