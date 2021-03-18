import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MovieListItemModel } from 'src/app/core/movies/models';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesListComponent implements OnInit {
  @Input() movies: MovieListItemModel[] = [];
  @Output() edit = new EventEmitter<MovieListItemModel>();
  @Output() archive = new EventEmitter<MovieListItemModel>();

  constructor() {}

  ngOnInit(): void {}

  onEdit(item: MovieListItemModel): void {
    this.edit.emit(item);
  }

  onArchive(item: MovieListItemModel): void {
    this.edit.emit(item);
  }
}
