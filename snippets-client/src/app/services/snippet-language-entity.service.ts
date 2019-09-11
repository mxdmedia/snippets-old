import { SnippetLanguage } from '../models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAutoEntityService, IEntityInfo } from '@briebug/ngrx-auto-entity';
import { environment } from '../../environments/environment';

@Injectable()
export class SnippetLanguageEntityService
  implements IAutoEntityService<SnippetLanguage> {
  constructor(private http: HttpClient) {}

  load(
    entityInfo: IEntityInfo,
    id: any,
    criteria?: any
  ): Observable<SnippetLanguage> {
    return this.http.get<SnippetLanguage>(
      `${environment.apiBase}/snippet-languages/${id}`,
      {
        params: criteria ? criteria.query || {} : {}
      }
    );
  }

  loadAll(entityInfo: IEntityInfo): Observable<SnippetLanguage[]> {
    return this.http.get<SnippetLanguage[]>(
      `${environment.apiBase}/snippet-languages`
    );
  }

  create(
    entityInfo: IEntityInfo,
    entity: SnippetLanguage
  ): Observable<SnippetLanguage> {
    return this.http.post<SnippetLanguage>(
      `${environment.apiBase}/snippet-languages`,
      entity
    );
  }

  update(
    entityInfo: IEntityInfo,
    entity: SnippetLanguage
  ): Observable<SnippetLanguage> {
    return this.http.patch<SnippetLanguage>(
      `${environment.apiBase}/snippet-languages/${entity.id}`,
      entity
    );
  }

  replace(
    entityInfo: IEntityInfo,
    entity: SnippetLanguage
  ): Observable<SnippetLanguage> {
    return this.http.put<SnippetLanguage>(
      `${environment.apiBase}/snippet-languages/${entity.id}`,
      entity
    );
  }

  delete(
    entityInfo: IEntityInfo,
    entity: SnippetLanguage
  ): Observable<SnippetLanguage> {
    return this.http
      .delete<any>(`${environment.apiBase}/snippet-languages/${entity.id}`)
      .pipe(map(() => entity)); // Must return entity with key
  }
}
