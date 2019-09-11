import { Key } from '@briebug/ngrx-auto-entity';

export class SnippetTag {
  @Key tag: string;
  description: string;
  created: Date;
  count: number;
}

export class SnippetTagApi {
  tag: string;
  description: string;
  created: string;
  count: number;
}

export class SnippetTagApiMeta {
  count: number;
  next: string;
  previous: string;
  results: SnippetTagApi[];
}
