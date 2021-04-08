import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CastMemberModel } from 'src/app/core/movies/models/cast-member.model';
import { castMemberActions } from '../../../store/cast/actions';
import { castSelectors } from '../../../store/cast/selectors';
import { MovieModuleState } from '../../../store/state';

@Component({
  selector: 'app-add-new-cast-member-dialog',
  templateUrl: './add-edit-cast-member-dialog.container.html',
  styleUrls: ['./add-edit-cast-member-dialog.container.scss'],
})
export class AddEditCastMemberDialogContainerComponent implements OnInit {
  castMember: Observable<CastMemberModel>;

  constructor(
    private store: Store<MovieModuleState>,
    private dialogRef: MatDialogRef<AddEditCastMemberDialogContainerComponent>
  ) {
    this.castMember = this.store.select(castSelectors.addEditCastMember);
  }

  ngOnInit(): void {}

  submited(model: CastMemberModel): void {
    if (!!model.castId) {
      this.store.dispatch(castMemberActions.edit({ castMember: model }));
    } else {
      this.store.dispatch(castMemberActions.addNew({ cast: model }));
    }

    this.cancel();
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
