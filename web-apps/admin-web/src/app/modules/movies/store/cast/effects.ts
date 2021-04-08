import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { CastMemberModel } from 'src/app/core/movies/models/cast-member.model';
import { CastMembersService } from 'src/app/core/movies/services/cast-members.service';
import { MoviesService } from 'src/app/core/movies/services/movies.service';
import { castMemberActions } from './actions';

@Injectable()
export class CastMembersEffects {
  constructor(
    private actions$: Actions,
    private castService: CastMembersService
  ) {}

  addNewCastMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(castMemberActions.addNew),
      mergeMap((action: { cast: CastMemberModel }) => {
        return this.castService
          .save(action.cast)
          .pipe(
            map((result) =>
              castMemberActions.addNewCompleted({ cast: result.data })
            )
          );
      })
    )
  );

  addCastToMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(castMemberActions.addToMovie),
      mergeMap((action) => {
        return this.castService
          .addToMovie(
            action.movieId,
            action.members.map((m) => m.castId)
          )
          .pipe(
            map(() => castMemberActions.getList({ movieId: action.movieId }))
          );
      })
    )
  );

  removeCastFromMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(castMemberActions.removeFromMovie),
      mergeMap((action) => {
        return this.castService
          .removeFromMovie(action.movieId, action.castMemberId)
          .pipe(
            map(() => castMemberActions.getList({ movieId: action.movieId }))
          );
      })
    )
  );

  getList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(castMemberActions.getList),
      mergeMap((action) => {
        return this.castService
          .getList(action.movieId)
          .pipe(
            map((response) =>
              castMemberActions.setList({ castMembers: response })
            )
          );
      })
    )
  );

  searchCastMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(castMemberActions.search),
      switchMap((action) => {
        return this.castService
          .search(action.searchValue)
          .pipe(
            map((response) =>
              castMemberActions.searchCompleted({ castMembers: response })
            )
          );
      })
    )
  );
}
