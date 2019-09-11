import { Snippet, SnippetApi, SnippetApiMeta } from '../models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  IAutoEntityService,
  IEntityInfo,
  IEntityWithPageInfo,
  Range,
  ISkipTakeRange,
  IEntityWithRangeInfo
} from '@briebug/ngrx-auto-entity';
import { environment } from '../../environments/environment';

@Injectable()
export class SnippetEntityService implements IAutoEntityService<Snippet> {
  constructor(private http: HttpClient) {}

  load(
    entityInfo: IEntityInfo,
    id: any,
    criteria: any = {}
  ): Observable<Snippet> {
    return this.http
      .get<SnippetApi>(`${environment.apiBase}/snippets/${id}`, {
        params: criteria ? criteria : {}
      })
      .pipe(
        map(res => ({
          ...res,
          created: new Date(res.created),
          updated: new Date(res.updated)
        }))
      );
  }

  loadAll(entityInfo: IEntityInfo, criteria: any = {}): Observable<Snippet[]> {
    return this.http
      .get<SnippetApiMeta>(`${environment.apiBase}/snippets`, {
        params: criteria ? criteria : {}
      })
      .pipe(
        map(res =>
          res.results.map(snippet => ({
            ...snippet,
            created: new Date(snippet.created),
            updated: new Date(snippet.updated)
          }))
        )
      );
  }

  loadRange(
    entityInfo: IEntityInfo,
    { skip = 0, take = 5 }: ISkipTakeRange,
    criteria: any = {}
  ): Observable<IEntityWithRangeInfo<Snippet>> {
    const params = {
      limit: take,
      offset: skip,
      ...(criteria ? criteria : {})
    };
    return this.http
      .get<SnippetApiMeta>(`${environment.apiBase}/snippets`, { params })
      .pipe(
        map(snippetsMeta => ({
          rangeInfo: {
            range: {
              skip,
              take
            },
            totalCount: snippetsMeta.count
          },
          entities: snippetsMeta.results.map(snippet => ({
            ...snippet,
            created: new Date(snippet.created),
            updated: new Date(snippet.updated)
          }))
        }))
      );
  }

  loadMany(entityInfo: IEntityInfo, criteria: any = {}): Observable<Snippet[]> {
    return this.http
      .get<SnippetApiMeta>(`${environment.apiBase}/snippets`, {
        params: criteria ? criteria : {}
      })
      .pipe(
        map(res =>
          res.results.map(snippet => ({
            ...snippet,
            created: new Date(snippet.created),
            updated: new Date(snippet.updated)
          }))
        )
      );
  }

  create(entityInfo: IEntityInfo, entity: Snippet): Observable<Snippet> {
    return this.http
      .post<SnippetApi>(`${environment.apiBase}/snippets`, entity)
      .pipe(
        map(res => ({
          ...res,
          created: new Date(res.created),
          updated: new Date(res.updated)
        }))
      );
  }

  update(entityInfo: IEntityInfo, entity: Snippet): Observable<Snippet> {
    return this.http
      .patch<SnippetApi>(`${environment.apiBase}/snippets/${entity.id}`, entity)
      .pipe(
        map(res => ({
          ...res,
          created: new Date(res.created),
          updated: new Date(res.updated)
        }))
      );
  }

  replace(entityInfo: IEntityInfo, entity: any): Observable<Snippet> {
    return this.http
      .put<SnippetApi>(`${environment.apiBase}/snippets/${entity.id}`, entity)
      .pipe(
        map(res => ({
          ...res,
          created: new Date(res.created),
          updated: new Date(res.updated)
        }))
      );
  }

  delete(entityInfo: IEntityInfo, entity: Snippet): Observable<Snippet> {
    return this.http
      .delete<any>(`${environment.apiBase}/snippets/${entity.id}`)
      .pipe(map(() => entity)); // Must return entity with key
  }
}
