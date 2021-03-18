import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  CountryModel,
  LanguageModel,
  MovieFilterModel,
  MovieListItemModel,
  StudioModel,
} from 'src/app/core/movies/models';
import { MoviesService } from 'src/app/core/movies/services/movies.service';
import { PATHS } from 'src/app/_shared/paths/paths';

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

  constructor(moviesService: MoviesService, private router: Router) {
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

  archive(item: MovieListItemModel): void {}

  applyFilters(filter: MovieFilterModel): void {
    console.log(filter);
  }
}
