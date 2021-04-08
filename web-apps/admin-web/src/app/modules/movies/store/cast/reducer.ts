import { on } from '@ngrx/store';
import { emptyCastMember } from 'src/app/core/movies/models/cast-member.model';
import { MovieModuleState } from '../state';
import { castMemberActions } from './actions';

export const castActionReducers = [
  on(castMemberActions.searchCompleted, (state: MovieModuleState, action) => {
    return {
      ...state,
      cast: { ...state.cast, searchResult: action.castMembers },
    };
  }),
  on(castMemberActions.addNew, (state: MovieModuleState, action) => {
    return {
      ...state,
      cast: { ...state.cast, addEditCastMember: emptyCastMember() },
    };
  }),
  on(castMemberActions.addNewCompleted, (state: MovieModuleState, action) => {
    return {
      ...state,
      cast: { ...state.cast, newCastMember: action.cast },
    };
  }),
  on(castMemberActions.setForEdit, (state: MovieModuleState, action) => {
    return {
      ...state,
      cast: { ...state.cast, addEditCastMember: action.castMember },
    };
  }),
  on(castMemberActions.setList, (state: MovieModuleState, action) => {
    return {
      ...state,
      cast: { ...state.cast, list: action.castMembers },
    };
  }),
];
