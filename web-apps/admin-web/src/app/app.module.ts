import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './root/root.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [RootComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [RootComponent],
})
export class AppModule {}
