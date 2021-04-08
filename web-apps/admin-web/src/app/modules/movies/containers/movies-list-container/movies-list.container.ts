import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import {
  CountryModel,
  LanguageModel,
  MovieFilterModel,
  MovieListItemModel,
  StudioModel,
} from 'src/app/core/movies/models';
import { ConfirmDialogServiceService } from 'src/app/framework/components/confirm-dialog-service.service';
import { PATHS } from 'src/app/_shared/paths/paths';
import { Store } from '@ngrx/store';
import { MovieModuleState } from '../../store/state';
import {
  deleteMovie,
  moviesList,
  searchFilterActions,
} from '../../store/movies/actions';
import { moviesSelectors } from '../../store/movies/selectors';

@UntilDestroy()
@Component({
  selector: 'app-movies-list-container',
  templateUrl: './movies-list.container.html',
  styleUrls: ['./movies-list.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesListContainerComponent implements OnInit {
  languages: Observable<LanguageModel[]>;
  countries: Observable<CountryModel[]>;
  studios: Observable<StudioModel[]>;
  years: Observable<number[]>;
  movies: Observable<MovieListItemModel[]>;
  filter: MovieFilterModel;

  constructor(
    private router: Router,
    private confirm: ConfirmDialogServiceService,
    private store: Store<MovieModuleState>
  ) {
    this.languages = store.select(moviesSelectors.languages);
    this.countries = store.select(moviesSelectors.countries);
    this.studios = store.select(moviesSelectors.studios);
    this.years = store.select(moviesSelectors.years);
    this.movies = store.select(moviesSelectors.list);
  }

  ngOnInit(): void {
    this.store.dispatch(moviesList.get());
    this.store.dispatch(searchFilterActions.getData());
  }

  addNew(): void {
    this.router.navigate([PATHS.MOVIES.ADD_NEW]);
  }

  edit(item: MovieListItemModel): void {
    this.router.navigate([PATHS.MOVIES.EDIT(item.id)]);
  }

  viewDetails(item: MovieListItemModel): void {
    this.router.navigate([PATHS.MOVIES.DETAILS(item.id)]);
  }

  delete(item: MovieListItemModel): void {
    this.confirm
      .ask({
        title: 'Deleting Movie',
        question: `Are you sure about deleting the movie: ${item.title} ?`,
        ok: 'Yes, Delete',
      })
      .pipe(
        untilDestroyed(this),
        filter((ok) => ok)
      )
      .subscribe(() => {
        this.store.dispatch(deleteMovie({ movieId: item.id }));
      });
  }

  applyFilters(model: MovieFilterModel): void {
    this.store.dispatch(searchFilterActions.apply({ filter: model }));
  }
}
