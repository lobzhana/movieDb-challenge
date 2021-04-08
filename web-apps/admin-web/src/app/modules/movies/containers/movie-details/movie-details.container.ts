import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CastMemberModel } from 'src/app/core/movies/models/cast-member.model';
import { ConfirmDialogServiceService } from 'src/app/framework/components/confirm-dialog-service.service';

import { castMemberActions } from '../../store/cast/actions';
import { castSelectors } from '../../store/cast/selectors';
import { MovieModuleState } from '../../store/state';
import { AddCastMemberToMovieDialogContainerComponent } from '../dialogs/add-cast-member-to-movie-dialog/add-cast-member-to-movie-dialog.container';
import { AddEditCastMemberDialogContainerComponent } from '../dialogs/add-new-cast-member-dialog/add-edit-cast-member-dialog.container';

@UntilDestroy()
@Component({
  selector: 'app-details',
  templateUrl: './movie-details.container.html',
  styleUrls: ['./movie-details.container.scss'],
})
export class DetailsContainerComponent implements OnInit {
  movieId: string;
  castMembers: Observable<CastMemberModel[]>;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private store: Store<MovieModuleState>,
    private confirm: ConfirmDialogServiceService
  ) {
    this.castMembers = store.select(castSelectors.list);
  }

  ngOnInit(): void {
    this.setMovieId();
  }

  setMovieId(): void {
    this.route.params
      .pipe(untilDestroyed(this))
      .subscribe((params: { movieId: string }) => {
        this.movieId = params.movieId;
        this.store.dispatch(
          castMemberActions.getList({ movieId: this.movieId })
        );
      });
  }

  addCast(): void {
    this.dialog
      .open(AddCastMemberToMovieDialogContainerComponent, {
        data: {
          movieId: this.movieId,
        },
      })
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.store.dispatch(
          castMemberActions.getList({ movieId: this.movieId })
        );
      });
  }

  editCastMember(model: CastMemberModel): void {
    this.store.dispatch(castMemberActions.setForEdit({ castMember: model }));
    this.dialog.open(AddEditCastMemberDialogContainerComponent);
  }

  removeCastMember(model: CastMemberModel): void {
    this.confirm
      .ask({
        question: 'Are you sure about removing cast member from this movie?',
        title: 'Remove Cast Member',
      })
      .pipe(
        untilDestroyed(this),
        filter((ok) => ok)
      )
      .subscribe(() => {
        this.store.dispatch(
          castMemberActions.removeFromMovie({
            movieId: this.movieId,
            castMemberId: model.castId,
          })
        );
      });
  }
}
