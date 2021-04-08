import { createAction, props } from '@ngrx/store';

import { CastMemberModel } from 'src/app/core/movies/models/cast-member.model';

const actionName = (name: string) => `[CAST MEMBERS] ${name}`;
export const castMemberActions = {
  addNew: createAction(
    actionName('Add New'),
    props<{ cast: CastMemberModel }>()
  ),
  addNewCompleted: createAction(
    actionName('Add New Completed'),
    props<{ cast: CastMemberModel }>()
  ),
  setForEdit: createAction(
    actionName('Set For Edit'),
    props<{ castMember: CastMemberModel }>()
  ),
  edit: createAction(
    actionName('Edit'),
    props<{ castMember: CastMemberModel }>()
  ),
  addToMovie: createAction(
    actionName('Add Cast To Movie'),
    props<{ movieId: string; members: CastMemberModel[] }>()
  ),
  removeFromMovie: createAction(
    actionName('Remove From Movie'),
    props<{ movieId: string; castMemberId: string }>()
  ),
  getList: createAction(actionName('Get List'), props<{ movieId: string }>()),
  setList: createAction(
    actionName('Set List'),
    props<{ castMembers: CastMemberModel[] }>()
  ),
  search: createAction(actionName('Search'), props<{ searchValue: string }>()),
  searchCompleted: createAction(
    actionName('Search Completed'),
    props<{
      castMembers: CastMemberModel[];
    }>()
  ),
};
