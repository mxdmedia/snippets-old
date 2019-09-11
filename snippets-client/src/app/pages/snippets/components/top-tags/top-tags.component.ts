import { SnippetTag } from 'src/app/models/snippet-tag.model';
import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges
} from '@angular/core';

interface SelectedTag {
  tag: SnippetTag;
  selected: boolean;
}

@Component({
  selector: 'app-top-tags',
  templateUrl: './top-tags.component.html',
  styleUrls: ['./top-tags.component.scss']
})
export class TopTagsComponent implements OnInit, OnChanges {
  @Input() tags: SnippetTag[];
  selectedTags: SelectedTag[] = [];

  @Output() selectTags = new EventEmitter<SnippetTag[]>();

  constructor() {}

  ngOnInit() {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    console.log('onChanges');
    const newSelectedTags: SelectedTag[] = this.tags.map(tag => {
      const existing = this.selectedTags.find(st => st.tag.tag === tag.tag);
      return { tag, selected: existing ? existing.selected : false };
    });
    this.selectedTags = newSelectedTags;
  }

  tagClicked(tag: SelectedTag) {
    tag.selected = !tag.selected;
    this.selectTags.emit(
      this.selectedTags
        .filter(selTag => selTag.selected)
        .map(selTag => selTag.tag)
    );
  }
}
