import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewMovieComponent } from './containers/add-new-movie/add-new-movie.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/framework/material/material.module';
import { AddEditMovieComponent } from './components/add-edit-movie/add-edit-movie.component';

const routes: Routes = [
  {
    path: '',
    component: AddNewMovieComponent,
  },
];

@NgModule({
  declarations: [AddNewMovieComponent, AddEditMovieComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule],
})
export class MoviesModule {}
