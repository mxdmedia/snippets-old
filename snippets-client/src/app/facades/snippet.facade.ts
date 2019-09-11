import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Snippet } from '../models';
import { AppState } from '../state/app.state';
import { Injectable } from '@angular/core';
import { SnippetFacadeBase } from '../state';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class SnippetFacade extends SnippetFacadeBase {
  constructor(store: Store<AppState>) {
    super(Snippet, store);
  }

  get all$(): Observable<Snippet[]> {
    return super.all$.pipe(
      map(snippets => snippets.sort((a, b) => (a.created > b.created ? -1 : 1)))
    );
  }
}
