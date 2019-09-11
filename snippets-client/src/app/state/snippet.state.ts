import { buildState } from '@briebug/ngrx-auto-entity';
import { createReducer } from '@ngrx/store';
import { Snippet } from '../models';

export const {
  initialState: snippetInitialState,
  selectors: snippetSelectors,
  facade: SnippetFacadeBase
} = buildState(Snippet);
export const snippetReducer = createReducer(snippetInitialState);
