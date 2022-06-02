import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StringUtil } from '../../../utils/string.util';
import { ExceptionService } from '../../exception/exception.service';
import { HttpDelete } from '../delete/http-delete.interface';
import { HttpGetAll } from '../get-all/http-get-all.interface';
import { HttpGetById } from '../get-by-id/http-get-by-id.interface';
import { HttpPost } from '../post/http-post.interface';
import { HttpPut } from '../put/http-put.interface';
import { QueryFilter } from '../query-filter/query-filter';
import { QueryFilterParam } from '../query-filter/query-filter.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpCrudService<PostIn, PostOut, GetAll, GetById, PutIn, PutOut>
  implements HttpPost<PostIn, PostOut>, HttpGetAll<GetAll>, HttpGetById<GetById>, HttpPut<PutIn, PutOut>, HttpDelete {

  private queryFilter = '';

  constructor(
    public readonly httpClient: HttpClient,
    public readonly exceptionService: ExceptionService,
    @Inject(String)
    public readonly endPointSingular: string,
    @Inject(String)
    public readonly endPointPlural: string
  ) { }

  public post(type: PostIn): Observable<PostOut> {
    return this.httpClient
      .post<PostOut>(this.endPointSingular, type)
      .pipe(
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }

  public queryFilterAdd(query: QueryFilterParam | Array<QueryFilterParam>): void {
    if (StringUtil.isArray(query)) {
      if ((query as Array<QueryFilterParam>).length) {
        this.queryFilter = QueryFilter.concat(query, this.queryFilter);
      }
      return;
    }
    if (query) {
      this.queryFilter = QueryFilter.concat(query, this.queryFilter);
    }
  }

  public queryFilterRemove(): void {
    this.queryFilter = '';
  }

  public getAll(): Observable<GetAll> {
    return this.httpClient
      .get<GetAll>(`${this.endPointPlural}${this.queryFilter}`)
      .pipe(
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }

  public getById(id: string): Observable<GetById> {
    return this.httpClient
      .get<GetById>(`${this.endPointSingular}/${id}`)
      .pipe(
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }

  public put(type: PutIn): Observable<PutOut> {
    const id = type['id' as never];
    return this.httpClient
      .put<PutOut>(`${this.endPointSingular}/${id}`, type)
      .pipe(
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }

  public delete(id: string): Observable<void> {
    return this.httpClient
    .delete<void>(`${this.endPointSingular}/${id}`)
      .pipe(
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }

}
