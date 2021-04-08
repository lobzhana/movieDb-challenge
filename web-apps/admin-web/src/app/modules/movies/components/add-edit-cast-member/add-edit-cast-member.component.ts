import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CastMemberModel } from 'src/app/core/movies/models/cast-member.model';
import { ImageUploadService } from 'src/app/core/movies/services/movies.service';

@UntilDestroy()
@Component({
  selector: 'app-add-edit-cast-member',
  templateUrl: './add-edit-cast-member.component.html',
  styleUrls: ['./add-edit-cast-member.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditCastMemberComponent implements OnInit, OnChanges {
  @Input() castMember: CastMemberModel;
  @Output() submited = new EventEmitter<CastMemberModel>();
  @Output() cancel = new EventEmitter();

  castForm: FormGroup = new FormGroup({});

  isEditMode = () => !!this.castMember?.castId;

  constructor(
    private fb: FormBuilder,
    private imageUploader: ImageUploadService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.castMember?.currentValue) {
      this.buildForm(changes.castMember?.currentValue);
    }
  }

  buildForm(castMember: CastMemberModel): FormGroup {
    return this.fb.group({
      castId: [castMember.castId],
      photo: [],
      firstName: [castMember.firstName, Validators.required],
      lastName: [castMember.lastName, Validators.required],
      birthDate: [castMember.birthDate, Validators.required],
      height: [castMember.height, Validators.required],
    });
  }

  submit(): void {
    const model = this.castForm.getRawValue() as CastMemberModel;

    this.submited.emit(model);
  }

  photoChanged(files: FileList): void {
    // change it to event emitter

    if (!files && !files.length) {
      return;
    }

    this.imageUploader
      .upload(files[0])
      .pipe(untilDestroyed(this))
      .subscribe((upload) => {
        this.castForm.controls.photo.patchValue({ fileName: upload.fileName });
      });
  }
}
