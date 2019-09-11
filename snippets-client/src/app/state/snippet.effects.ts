import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AppState } from './app.state';
import { Store } from '@ngrx/store';
import { createEffect, Actions } from '@ngrx/effects';
import {
  ofEntityType,
  EntityActionTypes,
  LoadAll
} from '@briebug/ngrx-auto-entity';
import { Snippet, SnippetTag, SnippetLanguage } from '../models';

// Necessary until createdAt selector working in auto-entity
@Injectable()
export class ExtraSnippetEffects {
  createSnippetExtrasEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofEntityType(Snippet, EntityActionTypes.CreateSuccess),
        tap(() => {
          this.store.dispatch(new LoadAll(SnippetTag));
          this.store.dispatch(new LoadAll(SnippetLanguage));
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private store: Store<AppState>) {}
}
