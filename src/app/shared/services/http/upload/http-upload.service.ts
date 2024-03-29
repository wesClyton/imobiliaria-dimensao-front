import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeader } from '../../../enums/http-header.enum';
import { MimeTypes } from '../../../enums/mime-types.enum';
import { ExceptionService } from '../../exception/exception.service';
import { HttpUpload } from './http-upload.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpUploadService<UploadOut> implements HttpUpload<UploadOut> {

  constructor(
    public readonly httpClient: HttpClient,
    public readonly exceptionService: ExceptionService,
    @Inject(String)
    public readonly endPoint: string
  ) { }

  public post(formData: FormData): Observable<UploadOut> {
    return this.httpClient
      .post<UploadOut>(this.endPoint, formData, { headers: this.getHeadersFormData() })
      .pipe(
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }

  public update(id: string, formData: FormData): Observable<UploadOut> {
    return this.httpClient
      .put<UploadOut>(`${this.endPoint}/${id}`, formData, { headers: this.getHeadersFormData() })
      .pipe(
        catchError((error) => {
          this.exceptionService.handleError(error);
          return throwError(error);
        })
      );
  }

  private getHeadersFormData(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append(HttpHeader.ContentType, MimeTypes.FormData);
    return headers;
  }

}
