import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import {
  CountryModel,
  LanguageModel,
  MovieModel,
  StudioModel,
} from 'src/app/core/movies/models';
import { MoviesService } from 'src/app/core/movies/services/movies.service';

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

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.languages = this.moviesService.getLanguages();
    this.countries = this.moviesService.getCountries();
    this.studios = this.moviesService.getStudios();
  }

  addMovie(movie: MovieModel): void {
    console.log('movie to add:');
    console.log(movie);

    this.moviesService
      .save(movie)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          console.log('movie added');
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
