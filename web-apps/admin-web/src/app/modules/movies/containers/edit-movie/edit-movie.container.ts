import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  CountryModel,
  LanguageModel,
  MovieModel,
  StudioModel,
} from 'src/app/core/movies/models';
import { MoviesService } from 'src/app/core/movies/services/movies.service';
import { PATHS } from 'src/app/_shared/paths/paths';

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
    private moviesService: MoviesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.languages = this.moviesService.getLanguages();
    this.countries = this.moviesService.getCountries();
    this.studios = this.moviesService.getStudios();

    this.route.params.pipe(untilDestroyed(this)).subscribe((p) => {
      this.movie = this.moviesService.getMovie(p.id);
    });
  }

  editMovie(movie: MovieModel): void {
    this.moviesService
      .save(movie)
      .pipe(untilDestroyed(this))
      .pipe(catchError((err, o) => of({ success: false, message: err })))
      .subscribe((response) => {
        if (response.success) {
          this.router.navigate([PATHS.MOVIES.LIST]);
        } else {
          console.log(response.message);
        }
      });
  }

  cancel(): void {
    this.router.navigate([PATHS.MOVIES.LIST]);
  }
}
