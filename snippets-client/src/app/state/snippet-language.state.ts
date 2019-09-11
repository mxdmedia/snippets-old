import { buildState } from '@briebug/ngrx-auto-entity';
import { createReducer } from '@ngrx/store';
import { SnippetLanguage } from '../models';

export const {
  initialState: snippetLanguageInitialState,
  selectors: snippetLanguageSelectors,
  facade: SnippetLanguageFacadeBase
} = buildState(SnippetLanguage);
export const snippetLanguageReducer = createReducer(
  snippetLanguageInitialState
);
