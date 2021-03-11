import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewMovieContainerComponent } from './containers/add-new-movie/add-new-movie.container';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/framework/material/material.module';
import { AddEditMovieComponent } from './components/add-edit-movie/add-edit-movie.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AddNewMovieContainerComponent,
  },
];

@NgModule({
  declarations: [AddNewMovieContainerComponent, AddEditMovieComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
})
export class MoviesModule {}
