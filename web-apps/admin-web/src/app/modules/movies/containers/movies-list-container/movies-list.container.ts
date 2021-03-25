import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import {
  CountryModel,
  LanguageModel,
  MovieFilterModel,
  MovieListItemModel,
  StudioModel,
} from 'src/app/core/movies/models';
import { MoviesService } from 'src/app/core/movies/services/movies.service';
import { ConfirmDialogServiceService } from 'src/app/framework/components/confirm-dialog-service.service';
import { PATHS } from 'src/app/_shared/paths/paths';

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
    private moviesService: MoviesService,
    private router: Router,
    private confirm: ConfirmDialogServiceService,
    private cd: ChangeDetectorRef
  ) {
    this.languages = moviesService.getLanguages();
    this.countries = moviesService.getCountries();
    this.studios = moviesService.getStudios();
    this.years = moviesService.getYears();
    this.movies = moviesService.search(null);
  }

  ngOnInit(): void {}

  addNew(): void {
    this.router.navigate([PATHS.MOVIES.ADD_NEW]);
  }

  edit(item: MovieListItemModel): void {
    this.router.navigate([PATHS.MOVIES.EDIT(item.id)]);
  }

  delete(item: MovieListItemModel): void {
    this.confirm
      .ask({
        title: 'Deleting Movie',
        question: `Are you sure about deleting the movie: ${item.title} ?`,
        ok: 'Yes, Delete',
      })
      .pipe(
        filter((ok) => ok),
        mergeMap(() => this.moviesService.delete(item.id)),
        untilDestroyed(this)
      )
      .subscribe((response) => {
        if (response.success) {
          this.refresh();
        } else {
          console.log('failed to delete');
        }
      });
  }

  refresh(): void {
    this.movies = this.moviesService.search(this.filter);
    this.cd.detectChanges();
  }

  applyFilters(model: MovieFilterModel): void {
    this.filter = { ...model };
    this.refresh();
  }
}
