import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewMovieContainerComponent } from './containers/add-new-movie/add-new-movie.container';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/framework/material/material.module';
import { AddEditMovieComponent } from './components/add-edit-movie/add-edit-movie.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviesListContainerComponent } from './containers/movies-list-container/movies-list.container';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { SearchFiltersComponent } from './components/search-filters/search-filters.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MovieListItemComponent } from './components/movie-list-item/movie-list-item.component';
import { EditMovieContainerComponent } from './containers/edit-movie/edit-movie.container';

const routes: Routes = [
  {
    path: '',
    component: MoviesListContainerComponent,
  },
  {
    path: 'all',
    component: MoviesListContainerComponent,
  },
  {
    path: 'new',
    component: AddNewMovieContainerComponent,
  },
  {
    path: 'edit/:id',
    component: EditMovieContainerComponent,
  },
];

@NgModule({
  declarations: [
    AddNewMovieContainerComponent,
    AddEditMovieComponent,
    MoviesListContainerComponent,
    SearchBoxComponent,
    SearchFiltersComponent,
    MoviesListComponent,
    MovieListItemComponent,
    EditMovieContainerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
})
export class MoviesModule {}
