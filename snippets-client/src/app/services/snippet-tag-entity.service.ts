import { SnippetTag, SnippetTagApi, SnippetTagApiMeta } from '../models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAutoEntityService, IEntityInfo } from '@briebug/ngrx-auto-entity';
import { environment } from '../../environments/environment';

@Injectable()
export class SnippetTagEntityService implements IAutoEntityService<SnippetTag> {
  constructor(private http: HttpClient) {}

  load(
    entityInfo: IEntityInfo,
    id: any,
    criteria?: any
  ): Observable<SnippetTag> {
    return this.http
      .get<SnippetTagApi>(`${environment.apiBase}/snippet-tags/${id}`, {
        params: criteria ? criteria.query || {} : {}
      })
      .pipe(
        map(res => ({
          ...res,
          created: new Date(res.created)
        }))
      );
  }

  loadAll(entityInfo: IEntityInfo, criteria: any): Observable<SnippetTag[]> {
    return this.http
      .get<SnippetTagApiMeta>(`${environment.apiBase}/snippet-tags`, {
        params: criteria ? criteria : {}
      })
      .pipe(
        map(res =>
          res.results.map(snippet => ({
            ...snippet,
            created: new Date(snippet.created)
          }))
        )
      );
  }

  loadMany(entityInfo: IEntityInfo, criteria: any): Observable<SnippetTag[]> {
    return this.http
      .get<SnippetTagApiMeta>(`${environment.apiBase}/snippet-tags`, {
        params: criteria ? criteria : {}
      })
      .pipe(
        map(res =>
          res.results.map(snippet => ({
            ...snippet,
            created: new Date(snippet.created)
          }))
        )
      );
  }

  create(entityInfo: IEntityInfo, entity: SnippetTag): Observable<SnippetTag> {
    return this.http
      .post<SnippetTagApi>(`${environment.apiBase}/snippet-tags`, entity)
      .pipe(
        map(res => ({
          ...res,
          created: new Date(res.created)
        }))
      );
  }

  update(entityInfo: IEntityInfo, entity: SnippetTag): Observable<SnippetTag> {
    return this.http
      .patch<SnippetTagApi>(
        `${environment.apiBase}/snippet-tags/${entity.tag}`,
        entity
      )
      .pipe(
        map(res => ({
          ...res,
          created: new Date(res.created)
        }))
      );
  }

  replace(entityInfo: IEntityInfo, entity: SnippetTag): Observable<SnippetTag> {
    return this.http
      .put<SnippetTagApi>(
        `${environment.apiBase}/snippet-tags/${entity.tag}`,
        entity
      )
      .pipe(
        map(res => ({
          ...res,
          created: new Date(res.created)
        }))
      );
  }

  delete(entityInfo: IEntityInfo, entity: SnippetTag): Observable<SnippetTag> {
    return this.http
      .delete<any>(`${environment.apiBase}/snippet-tags/${entity.tag}`)
      .pipe(map(() => entity)); // Must return entity with key
  }
}
