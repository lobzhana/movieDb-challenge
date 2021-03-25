import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ComponentsModule } from './components.module';
import {
  ConfirmDialogComponent,
  ConfirmDialogDataModel,
} from './confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: ComponentsModule,
})
export class ConfirmDialogServiceService {
  constructor(private matDialog: MatDialog) {}

  ask(data: ConfirmDialogDataModel = null): Observable<boolean> {
    return this.matDialog
      .open(ConfirmDialogComponent, { data: { ...data } })
      .afterClosed();
  }
}
