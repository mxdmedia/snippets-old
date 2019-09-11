import { ApiInterceptorService } from './services/api-interceptor.service';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { hljsLanguages } from './core/language-defs';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StateModule } from './state';
import { Snippet, SnippetLanguage, SnippetTag } from './models';
import {
  SnippetEntityService,
  SnippetTagEntityService,
  SnippetLanguageEntityService
} from './services';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    StateModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        languages: hljsLanguages
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true
    },
    { provide: Snippet, useClass: SnippetEntityService },
    { provide: SnippetLanguage, useClass: SnippetLanguageEntityService },
    { provide: SnippetTag, useClass: SnippetTagEntityService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
