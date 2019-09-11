import { IEntityState } from '@briebug/ngrx-auto-entity';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { Snippet, SnippetLanguage, SnippetTag } from '../models';
import { snippetReducer } from './snippet.state';
import { snippetLanguageReducer } from './snippet-language.state';
import { snippetTagReducer } from './snippet-tag.state';

export interface IAppState {
  snippet: IEntityState<Snippet>;
  snippetLanguage: IEntityState<SnippetLanguage>;
  snippetTag: IEntityState<SnippetTag>;
}

export type AppState = IAppState;

export const appReducer: ActionReducerMap<AppState> = {
  snippet: snippetReducer,
  snippetLanguage: snippetLanguageReducer,
  snippetTag: snippetTagReducer
};

export const appMetaReducers: Array<
  MetaReducer<AppState>
> = !environment.production ? [storeFreeze] : [];
