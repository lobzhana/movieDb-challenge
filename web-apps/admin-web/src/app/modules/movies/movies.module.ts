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
import { ComponentsModule } from 'src/app/framework/components/components.module';
import { createReducer, StoreModule } from '@ngrx/store';
import { movieActionReducers } from './store/movies/reducer';
import { castActionReducers } from './store/cast/reducer';
import { EffectsModule } from '@ngrx/effects';
import { MoviesModuleEffects } from './store/movies/effects';
import { DetailsContainerComponent } from './containers/movie-details/movie-details.container';
import { AddEditCastMemberComponent } from './components/add-edit-cast-member/add-edit-cast-member.component';
import { CastMembersEffects } from './store/cast/effects';
import { AddCastMemberToMovieComponent } from './components/add-cast-member-to-movie/add-cast-member-to-movie.component';
import { defaultMovieModuleState } from './store/state';
import { AddCastMemberToMovieDialogContainerComponent } from './containers/dialogs/add-cast-member-to-movie-dialog/add-cast-member-to-movie-dialog.container';
import { AddEditCastMemberDialogContainerComponent } from './containers/dialogs/add-new-cast-member-dialog/add-edit-cast-member-dialog.container';
import { CastMembersListComponent } from './components/cast-members-list/cast-members-list.component';
import { PipesModule } from 'src/app/framework/pipes/pipes.module';

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
  {
    path: 'details/:movieId',
    component: DetailsContainerComponent,
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
    DetailsContainerComponent,
    AddEditCastMemberComponent,
    AddCastMemberToMovieComponent,
    AddCastMemberToMovieDialogContainerComponent,
    AddEditCastMemberDialogContainerComponent,
    CastMembersListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    PipesModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(
      'movies',
      createReducer(
        defaultMovieModuleState,
        ...movieActionReducers,
        ...castActionReducers
      )
    ),
    EffectsModule.forFeature([MoviesModuleEffects, CastMembersEffects]),
    ComponentsModule,
  ],
})
export class MoviesModule {}
