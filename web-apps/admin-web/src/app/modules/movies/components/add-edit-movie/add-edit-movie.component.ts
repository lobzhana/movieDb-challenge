import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MovieModel,
  CountryModel,
  LanguageModel,
  StudioModel,
  EmptyMovieModel,
} from '../../../../core/movies/models';

@Component({
  selector: 'app-add-edit-movie',
  templateUrl: './add-edit-movie.component.html',
  styleUrls: ['./add-edit-movie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditMovieComponent implements OnInit {
  @Input() movie: MovieModel = EmptyMovieModel();
  @Input() years: number[];
  @Input() countries: CountryModel[];
  @Input() studios: StudioModel[];
  @Input() languages: LanguageModel[];

  @Output() save = new EventEmitter<MovieModel>();
  @Output() cancel = new EventEmitter();

  movieForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.movieForm = this.createFormSchema(this.movie);
  }

  createFormSchema(movieModel: MovieModel): FormGroup {
    const formGroup = this.fb.group({
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

  setCover(files: FileList): void {
    if (!files && !files.length) {
      return;
    }

    this.movieForm.patchValue({ cover: files[0] });
  }
}
