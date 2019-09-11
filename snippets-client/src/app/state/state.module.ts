import { ExtraSnippetEffects } from './snippet.effects';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { appMetaReducers, appReducer } from './app.state';
import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    StoreModule.forRoot(appReducer, { metaReducers: appMetaReducers }),
    EffectsModule.forRoot([ExtraSnippetEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    NgrxAutoEntityModule.forRoot()
  ]
})
export class StateModule {}
