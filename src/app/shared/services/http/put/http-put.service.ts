import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExceptionService } from '../../exception/exception.service';
import { HttpPut } from './http-put.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpPutService<PutIn, PutOut> implements HttpPut<PutIn, PutOut> {

  constructor(
    public readonly httpClient: HttpClient,
    public readonly exceptionService: ExceptionService,
    @Inject(String)
    public readonly endPoint: string
  ) { }

  public put(type: PutIn): Observable<PutOut> {
    const id = type['id' as never];
    return this.httpClient
      .put<PutOut>(`${this.endPoint}/${id ? id : ''}`, type)
      .pipe(
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }

}
