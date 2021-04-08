import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime } from 'rxjs/operators';
import { CastMemberModel } from 'src/app/core/movies/models/cast-member.model';

@UntilDestroy()
@Component({
  selector: 'app-add-cast-member-to-movie',
  templateUrl: './add-cast-member-to-movie.component.html',
  styleUrls: ['./add-cast-member-to-movie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCastMemberToMovieComponent implements OnInit, OnChanges {
  @Input() searchResult: CastMemberModel[];
  @Input() newCastMember: CastMemberModel;
  @Output() searchValueChanged = new EventEmitter<string>();
  @Output() submited = new EventEmitter<CastMemberModel[]>();
  @Output() addNewCast = new EventEmitter();

  selectedCasts: CastMemberModel[] = [];
  form: FormGroup;
  displayCastName = (cast: any) =>
    cast ? `${cast.firstName} ${cast.lastName}` : '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.createForm();
    this.searchValueChanged.emit('');
    this.handleSearchInput();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.handleNewCastMember(changes.newCastMember?.currentValue);
  }

  handleNewCastMember(castMember: CastMemberModel): void {
    if (!castMember) {
      return;
    }

    this.selectCastMember(castMember);
  }

  createForm(): FormGroup {
    return this.fb.group({
      searchValue: [null, Validators.required],
    });
  }

  handleSearchInput(): void {
    this.form
      .get('searchValue')
      .valueChanges.pipe(untilDestroyed(this), debounceTime(200))
      .subscribe((value) => this.searchValueChanged.emit(value));
  }

  selectCastMember(cast: CastMemberModel): void {
    const exists = !!this.selectedCasts.find((c) => c.castId === cast.castId);
    if (exists) {
      return;
    }

    this.selectedCasts.push(cast);
  }

  addNew(): void {
    this.addNewCast.emit();
  }

  submit(): void {
    this.submited.emit(this.selectedCasts);
  }
}
