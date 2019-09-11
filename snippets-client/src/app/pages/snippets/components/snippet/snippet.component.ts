import { Snippet, SnippetLanguage } from 'src/app/models';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.scss']
})
export class SnippetComponent {
  @Input() snippet: Snippet;
  @Input() languages: { [key: string]: SnippetLanguage } = {};
  @Input() user: string = null;

  @Output() edit = new EventEmitter<Snippet>();
  @Output() delete = new EventEmitter<Snippet>();

  constructor() {}
}
