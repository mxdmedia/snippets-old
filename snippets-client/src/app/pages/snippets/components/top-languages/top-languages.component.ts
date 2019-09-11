import { Component, OnInit, Input } from '@angular/core';
import { SnippetLanguage } from 'src/app/models';

@Component({
  selector: 'app-top-languages',
  templateUrl: './top-languages.component.html',
  styleUrls: ['./top-languages.component.scss']
})
export class TopLanguagesComponent implements OnInit {
  @Input() langauges: SnippetLanguage[];

  constructor() {}

  ngOnInit() {}
}
