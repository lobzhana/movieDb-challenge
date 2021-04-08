import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  CountryModel,
  LanguageModel,
  MovieModel,
  StudioModel,
} from 'src/app/core/movies/models';
import { routerNavigate } from 'src/app/store/actions';
import { PATHS } from 'src/app/_shared/paths/paths';
import { movieFormActions } from '../../store/movies/actions';
import { moviesSelectors } from '../../store/movies/selectors';
import { MovieModuleState } from '../../store/state';

@UntilDestroy()
@Component({
  selector: 'app-add-new-movie',
  templateUrl: './add-new-movie.container.html',
  styleUrls: ['./add-new-movie.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewMovieContainerComponent implements OnInit {
  languages: Observable<LanguageModel[]>;
  countries: Observable<CountryModel[]>;
  studios: Observable<StudioModel[]>;
  movie: Observable<MovieModel>;

  constructor(private store: Store<MovieModuleState>) {
    this.languages = this.store.select(moviesSelectors.languages);
    this.countries = this.store.select(moviesSelectors.countries);
    this.studios = this.store.select(moviesSelectors.studios);
    this.movie = this.store.select(moviesSelectors.currentMovie);
  }

  ngOnInit(): void {
    this.store.dispatch(movieFormActions.getFormData());
    this.store.dispatch(movieFormActions.initMovieForAdd());
  }

  addMovie(movie: MovieModel): void {
    this.store.dispatch(movieFormActions.saveMovie({ movie }));
  }

  cancel(): void {
    this.store.dispatch(routerNavigate({ uri: PATHS.MOVIES.LIST }));
  }
}
