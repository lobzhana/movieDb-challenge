import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { routerNavigate } from './actions';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private router: Router) {}

  $routerNavigate = createEffect(
    () =>
      this.actions$.pipe(
        ofType(routerNavigate),
        tap((action) => {
          this.router.navigate([action.uri]);
        })
      ),
    {
      dispatch: false,
    }
  );
}
