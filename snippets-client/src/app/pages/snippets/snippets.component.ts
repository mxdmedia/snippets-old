import { EditSnippetModalComponent } from './components/edit-snippet-modal/edit-snippet-modal.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  SnippetFacade,
  SnippetLanguageFacade,
  SnippetTagFacade
} from 'src/app/facades';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { SnippetLanguage, Snippet, SnippetTag } from 'src/app/models';
import { take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styleUrls: ['./snippets.component.scss']
})
export class SnippetsComponent implements OnInit, OnDestroy {
  params = {};
  nextSkip = 0;
  take = 2;
  totalPageable = 0;
  fullyLoaded = false;
  authenticated = false;
  userId: string = null;

  subs: Subscription = new Subscription();
  constructor(
    public snippets: SnippetFacade,
    public snippetLanguages: SnippetLanguageFacade,
    public snippetTags: SnippetTagFacade,
    public dialog: MatDialog,
    public auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.snippets.loadRange({ skip: this.nextSkip, take: 4 }, this.params);
    this.nextSkip = 4;
    this.loadLanguagesTags();
    this.subs.add(
      this.snippets.totalPageable$.subscribe(
        totalPageable => (this.totalPageable = totalPageable)
      )
    );
    this.subs.add(
      this.auth.authState.subscribe(authState => {
        this.authenticated = authState.authenticated;
        this.userId = authState.authenticated ? authState.user : null;
      })
    );
    this.subs.add(
      this.snippets.savedAt$.subscribe(savedAt => {
        if (savedAt) {
          this.loadLanguagesTags();
        }
      })
    );
    this.subs.add(
      this.snippets.deletedAt$.subscribe(deletedAt => {
        if (deletedAt) {
          this.loadLanguagesTags();
        }
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  loadLanguagesTags() {
    this.snippetLanguages.loadAll();
    this.snippetTags.loadAll();
  }

  onScroll() {
    if (this.nextSkip < this.totalPageable) {
      this.snippets.loadRange(
        { skip: this.nextSkip, take: this.take },
        this.params
      );
      this.nextSkip += this.take;
    } else {
      this.fullyLoaded = true;
    }
  }

  createSnippet(languages: SnippetLanguage[]) {
    const snippet: Snippet = {
      title: null,
      language: null,
      tags: [],
      snippet: null
    };
    const dialogRef = this.dialog.open(EditSnippetModalComponent, {
      data: { languages, snippet }
    });
    dialogRef.afterClosed().subscribe((result: Snippet) => {
      if (result) {
        this.snippets.create(result);
      }
    });
  }

  editSnippet(snippet: Snippet) {
    this.snippetLanguages.all$.pipe(take(1)).subscribe(languages => {
      const dialogRef = this.dialog.open(EditSnippetModalComponent, {
        data: { languages, snippet }
      });
      dialogRef.afterClosed().subscribe((result: Snippet) => {
        if (result) {
          this.snippets.replace(result);
        }
      });
    });
  }

  updateSelectedTags(selectedTags: SnippetTag[]) {
    this.snippetTags.selectMany(selectedTags);
    let params = {};
    if (selectedTags.length > 0) {
      params = { tags: selectedTags.map(tag => tag.tag).join() };
    }
    this.params = params;
    this.snippets.clear();
    this.snippets.loadRange({ skip: 0, take: 4 }, this.params);
    this.nextSkip = 4;
  }
}
