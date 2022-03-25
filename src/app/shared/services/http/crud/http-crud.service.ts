import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExceptionService } from '../../exception/exception.service';
import { HttpDelete } from '../delete/http-delete.interface';
import { HttpGetAll } from '../get-all/http-get-all.interface';
import { HttpGetById } from '../get-by-id/http-get-by-id.interface';
import { HttpPost } from '../post/http-post.interface';
import { HttpPut } from '../put/http-put.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpCrudService<PostIn, PostOut, GetAll, GetById, PutIn, PutOut>
  implements HttpPost<PostIn, PostOut>, HttpGetAll<Array<GetAll>>, HttpGetById<GetById>, HttpPut<PutIn, PutOut>, HttpDelete {

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

  public getAll(): Observable<Array<GetAll>> {
    return this.httpClient
      .get<Array<GetAll>>(this.endPointPlural)
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