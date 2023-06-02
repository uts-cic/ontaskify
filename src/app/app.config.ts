import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { OntaskMergeMapPipe } from './shared/ontask-merge/ontask-merge-map.pipe';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      MatDialogModule
    ),
    provideRouter(routes, withComponentInputBinding()),
    OntaskMergeMapPipe,
  ],
};
