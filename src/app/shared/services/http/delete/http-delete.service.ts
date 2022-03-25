import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExceptionService } from '../../exception/exception.service';
import { HttpDelete } from './http-delete.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpDeleteService implements HttpDelete {

  constructor(
    public readonly httpClient: HttpClient,
    public readonly exceptionService: ExceptionService,
    @Inject(String)
    public readonly endPoint: string
  ) { }

  public delete(id: string): Observable<void> {
    return this.httpClient
    .delete<void>(`${this.endPoint}/${id}`)
      .pipe(
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }

}
