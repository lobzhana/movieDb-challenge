import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmDialogDataModel {
  title?: string;
  question?: string;
  ok?: string;
  nope?: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent implements OnInit {
  dataModel: ConfirmDialogDataModel = {
    question: 'Are you sure?',
    title: 'Confirm',
    nope: 'Nope',
    ok: 'Ok',
  };
  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData: ConfirmDialogDataModel
  ) {
    this.dataModel = { ...this.dataModel, ...dialogData };
  }

  ngOnInit(): void {}

  ok(): void {
    this.dialogRef.close(true);
  }

  nope(): void {
    this.dialogRef.close(false);
  }
}
