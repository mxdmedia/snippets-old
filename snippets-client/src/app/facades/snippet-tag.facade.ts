import { SnippetTag } from '../models';
import { AppState } from '../state/app.state';
import { Injectable } from '@angular/core';
import { SnippetTagFacadeBase } from '../state';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class SnippetTagFacade extends SnippetTagFacadeBase {
  constructor(store: Store<AppState>) {
    super(SnippetTag, store);
  }
}
