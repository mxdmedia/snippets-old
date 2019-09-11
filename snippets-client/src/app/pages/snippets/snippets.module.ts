import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismModule } from '@ngx-prism/core';

import { SnippetsRoutingModule } from './snippets-routing.module';
import { SnippetsComponent } from './snippets.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HighlightModule } from 'ngx-highlightjs';
import { SnippetComponent } from './components/snippet/snippet.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TopLanguagesComponent } from './components/top-languages/top-languages.component';
import { TopTagsComponent } from './components/top-tags/top-tags.component';
import { EditSnippetModalComponent } from './components/edit-snippet-modal/edit-snippet-modal.component';

@NgModule({
  declarations: [
    SnippetsComponent,
    SnippetComponent,
    TopLanguagesComponent,
    TopTagsComponent,
    EditSnippetModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PrismModule,
    HighlightModule,
    SnippetsRoutingModule,
    InfiniteScrollModule
  ],
  entryComponents: [EditSnippetModalComponent]
})
export class SnippetsModule {}
