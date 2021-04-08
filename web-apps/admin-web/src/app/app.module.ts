import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './root/root.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/effects';

@NgModule({
  declarations: [RootComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    StoreModule.forRoot({}, { initialState: {} }),
    StoreDevtoolsModule.instrument({
      maxAge: 50,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([AppEffects]),
  ],
  providers: [],
  bootstrap: [RootComponent],
})
export class AppModule {}
