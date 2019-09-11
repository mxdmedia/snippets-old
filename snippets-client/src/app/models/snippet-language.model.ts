import { Key } from '@briebug/ngrx-auto-entity';

export class SnippetLanguage {
  @Key id: string;
  name: string;
  prismCode: string;
  count: number;
}
