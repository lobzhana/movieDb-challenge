import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MovieCoverService } from 'src/app/core/movies/services/movies.service';
import {
  MovieModel,
  CountryModel,
  LanguageModel,
  StudioModel,
  EmptyMovieModel,
} from '../../../../core/movies/models';
@UntilDestroy()
@Component({
  selector: 'app-add-edit-movie',
  templateUrl: './add-edit-movie.component.html',
  styleUrls: ['./add-edit-movie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditMovieComponent implements OnChanges {
  @Input() movie: MovieModel;
  @Input() years: number[];
  @Input() countries: CountryModel[];
  @Input() studios: StudioModel[];
  @Input() languages: LanguageModel[];

  @Output() save = new EventEmitter<MovieModel>();
  @Output() cancel = new EventEmitter();

  movieForm: FormGroup;

  compare = {
    byId: (a: { id: string }, b: { id: string }) => a.id === b.id,
    byCode: (a: { code: string }, b: { code: string }) => a.code === b.code,
  };

  constructor(
    private fb: FormBuilder,
    private coverService: MovieCoverService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const movie = changes?.movie?.currentValue;
    if (movie) {
      console.log(movie);
      this.movieForm = this.createFormSchema(movie);
    }
  }

  createFormSchema(movieModel: MovieModel): FormGroup {
    const formGroup = this.fb.group({
      id: [movieModel.id],
      title: [movieModel.title, Validators.required],
      availableIn: [
        movieModel.availableIn ?? [],
        [Validators.required, Validators.minLength(1)],
      ],
      description: [movieModel.description, Validators.required],
      year: [movieModel.year, [Validators.required, Validators.min(1800)]],
      duration: [movieModel.duration, [Validators.required, Validators.min(1)]],
      countries: [
        movieModel.countries,
        [Validators.required, Validators.minLength(1)],
      ],
      studios: [
        movieModel.studios,
        [Validators.required, Validators.minLength(1)],
      ],
      director: [movieModel.director, Validators.required],
      imdb: this.fb.group({
        rating: [
          movieModel.imdb?.rating ?? 0,
          [Validators.max(10), Validators.min(0)],
        ],
        url: [movieModel.imdb?.url],
      }),
      cover: [movieModel.cover],
    });

    return formGroup;
  }

  submit(): void {
    if (!this.movieForm.valid) {
      return;
    }

    const formValue = this.movieForm.value as MovieModel;
    this.save.emit(formValue);
  }

  coverChanged(files: FileList): void {
    if (!files && !files.length) {
      return;
    }

    this.coverService
      .upload(files[0])
      .pipe(untilDestroyed(this))
      .subscribe((upload) => {
        this.movieForm.controls.cover.patchValue({ fileName: upload.fileName });
      });
  }
}
