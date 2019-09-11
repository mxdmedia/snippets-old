import { Key } from '@briebug/ngrx-auto-entity';

export class Snippet {
  @Key id?: string;
  title: string;
  snippet: string;
  language: string;
  author?: string;
  authorUsername?: string;
  tags: string[];
  created?: Date;
  updated?: Date;
}

export class SnippetApi {
  id: string;
  title: string;
  snippet: string;
  language: string;
  author: string;
  authorUsername: string;
  tags: string[];
  created: string;
  updated: string;
}

export class SnippetApiMeta {
  count: number;
  next: string;
  previous: string;
  results: SnippetApi[];
}
