import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
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
  selector: 'app-edit-movie.container',
  templateUrl: './edit-movie.container.html',
  styleUrls: ['./edit-movie.container.scss'],
})
export class EditMovieContainerComponent implements OnInit {
  languages: Observable<LanguageModel[]>;
  countries: Observable<CountryModel[]>;
  studios: Observable<StudioModel[]>;
  movie: Observable<MovieModel>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<MovieModuleState>
  ) {
    this.languages = this.store.select(moviesSelectors.languages);
    this.countries = this.store.select(moviesSelectors.countries);
    this.studios = this.store.select(moviesSelectors.studios);
    this.movie = this.store.select(moviesSelectors.currentMovie);
  }

  ngOnInit(): void {
    this.route.params.pipe(untilDestroyed(this)).subscribe((p) => {
      this.store.dispatch(movieFormActions.initMovieForEdit({ movieId: p.id }));
    });
  }

  editMovie(movie: MovieModel): void {
    this.store.dispatch(movieFormActions.saveMovie({ movie }));
  }

  cancel(): void {
    this.store.dispatch(routerNavigate({ uri: PATHS.MOVIES.LIST }));
  }
}
