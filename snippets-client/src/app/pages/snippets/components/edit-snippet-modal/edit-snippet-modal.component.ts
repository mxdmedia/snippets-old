import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  Inject,
  ViewChild,
  ElementRef,
  OnInit
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatDialogRef
} from '@angular/material';
import {
  SnippetLanguage,
  SnippetTag,
  SnippetTagApiMeta,
  Snippet
} from 'src/app/models';
import { FormControl } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-snippet-modal',
  templateUrl: './edit-snippet-modal.component.html',
  styleUrls: ['./edit-snippet-modal.component.scss']
})
export class EditSnippetModalComponent implements OnInit {
  // Inputs from matDialogData
  languages: SnippetLanguage[] = [];
  snippetObj: Snippet;

  snippetForm: FormGroup;

  // parameters for autocomplete
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagsCtrl = new FormControl();
  filteredTags: SnippetTag[] = [];
  tagErrorMsg: string;
  tagsLoading = false;

  @ViewChild('tagList', { static: false }) tagList;
  @ViewChild('tagInput', { static: false }) tagInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  constructor(
    public dialogRef: MatDialogRef<EditSnippetModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.languages = [
      ...data.languages.sort((a, b) => (a.name > b.name ? 1 : -1))
    ];
    this.snippetObj = { ...data.snippet };
  }

  ngOnInit() {
    this.snippetForm = this.fb.group({
      title: [this.snippetObj.title, [Validators.required]],
      language: [this.snippetObj.language, [Validators.required]],
      snippet: [this.snippetObj.snippet, [Validators.required]],
      tags: this.fb.array(
        this.snippetObj.tags.map(tag => this.fb.control(tag)),
        [Validators.required]
      )
    });

    this.setupAutocomplete();
  }

  get title() {
    return this.snippetForm.get('title');
  }

  get language() {
    return this.snippetForm.get('language');
  }

  get snippet() {
    return this.snippetForm.get('snippet');
  }

  get tags() {
    return this.snippetForm.get('tags') as FormArray;
  }

  setupAutocomplete() {
    this.tagsCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.tagErrorMsg = '';
          this.filteredTags = [];
          this.tagsLoading = true;
        }),
        switchMap(value =>
          this.http
            .get<SnippetTagApiMeta>(`${environment.apiBase}/snippet-tags`, {
              params: { search: value, ordering: 'tag', limit: '5' }
            })
            .pipe(
              finalize(() => {
                this.tagsLoading = false;
              })
            )
        )
      )
      .subscribe(searchResults => {
        this.filteredTags = searchResults.results.map(tag => ({
          ...tag,
          created: new Date(tag.created)
        }));
      });
  }

  addTag(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        this.tags.push(this.fb.control(value.trim()));
      }

      if (input) {
        input.value = '';
      }

      this.tagsCtrl.setValue(null);
    }
  }

  removeTag(index: number): void {
    if (index >= 0) {
      this.tags.removeAt(index);
    }
    if (this.tags.length === 0) {
      this.tagList.errorState = true;
    }
  }

  selectTag(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(this.fb.control(event.option.viewValue));
    this.tagList.errorState = false;
    this.tagInput.nativeElement.value = '';
    this.tagsCtrl.setValue(null);
  }

  save() {
    const result: Snippet = {
      ...this.snippetObj,
      ...this.snippetForm.value
    };
    this.dialogRef.close(result);
  }
}
