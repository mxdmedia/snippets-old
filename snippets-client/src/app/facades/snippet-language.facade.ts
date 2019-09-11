import { Observable } from 'rxjs';
import { SnippetLanguage } from '../models';
import { AppState } from '../state/app.state';
import { Injectable } from '@angular/core';
import { SnippetLanguageFacadeBase } from '../state';
import { Store, select } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SnippetLanguageFacade extends SnippetLanguageFacadeBase {
  constructor(private store: Store<AppState>) {
    super(SnippetLanguage, store);
  }

  get allAlpha$(): Observable<SnippetLanguage[]> {
    return this.all$.pipe(
      tap(snippets => snippets.sort((a, b) => (a.name > b.name ? 1 : -1)))
    );
  }

  get byCount$(): Observable<SnippetLanguage[]> {
    return this.all$.pipe(
      map(snippets => snippets.sort((a, b) => (a.count > b.count ? -1 : 1)))
    );
  }
}
