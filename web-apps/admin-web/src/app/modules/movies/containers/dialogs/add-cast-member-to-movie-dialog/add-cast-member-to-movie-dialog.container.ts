import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CastMemberModel } from 'src/app/core/movies/models/cast-member.model';
import { castMemberActions } from '../../../store/cast/actions';
import { castSelectors } from '../../../store/cast/selectors';
import { MovieModuleState } from '../../../store/state';
import { AddEditCastMemberDialogContainerComponent } from '../add-new-cast-member-dialog/add-edit-cast-member-dialog.container';

@Component({
  selector: 'app-add-cast-member-to-movie-dialog',
  templateUrl: './add-cast-member-to-movie-dialog.container.html',
  styleUrls: ['./add-cast-member-to-movie-dialog.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCastMemberToMovieDialogContainerComponent implements OnInit {
  movieId: string;
  searchResult: Observable<CastMemberModel[]>;
  newCastMember: Observable<CastMemberModel>;

  constructor(
    @Inject(MAT_DIALOG_DATA) dialogData: { movieId: string },
    private store: Store<MovieModuleState>,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddCastMemberToMovieDialogContainerComponent>
  ) {
    this.movieId = dialogData.movieId;
    this.searchResult = store.select(castSelectors.searchResult);
    this.newCastMember = store.select(castSelectors.newCastMember);
  }

  ngOnInit(): void {}

  searchValueChanged(searchValue: string): void {
    this.store.dispatch(castMemberActions.search({ searchValue }));
  }

  addNewCast(): void {
    this.dialog.open(AddEditCastMemberDialogContainerComponent);
  }

  submited(castMembers: CastMemberModel[]): void {
    this.store.dispatch(
      castMemberActions.addToMovie({
        movieId: this.movieId,
        members: castMembers,
      })
    );

    this.dialogRef.close();
  }
}
