import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from 'src/app/core/models/movies/movie';

@Component({
  selector: 'app-add-edit-movie',
  templateUrl: './add-edit-movie.component.html',
  styleUrls: ['./add-edit-movie.component.scss'],
})
export class AddEditMovieComponent implements OnInit {
  @Input() movie: Movie;
  @Input() years: number[];
  @Input() countries: { id: string; name: string }[];
  @Input() studios: { id: string; name: string }[];

  @Output() save = new EventEmitter<Movie>();
  @Output() cancel = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  fileChanged(files: FileList): void {
    console.log(files);
  }
}
