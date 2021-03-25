import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import {
  CountryModel,
  EmptyMovieModel,
  LanguageModel,
  MovieModel,
  StudioModel,
} from 'src/app/core/movies/models';
import { MoviesService } from 'src/app/core/movies/services/movies.service';
import { PATHS } from 'src/app/_shared/paths/paths';

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
  movie: MovieModel = EmptyMovieModel();

  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    this.languages = this.moviesService.getLanguages();
    this.countries = this.moviesService.getCountries();
    this.studios = this.moviesService.getStudios();
  }

  addMovie(movie: MovieModel): void {
    this.moviesService
      .save(movie)
      .pipe(untilDestroyed(this))
      .subscribe(
        (response) => {
          if (response.success) {
            this.router.navigate([PATHS.MOVIES.LIST]);
          }
        },
        (error) => {
          console.log('movie add failed');
          console.log(error);
        }
      );
  }

  cancel(): void {
    console.log('add movie canceled');
  }
}
