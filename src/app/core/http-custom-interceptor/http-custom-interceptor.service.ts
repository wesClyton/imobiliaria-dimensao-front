import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from '../../modules/auth/models/token.interface';
import { AuthService } from '../../modules/auth/services/auth.service';
import { HttpHeadersEnum } from '../../shared/enums/http-headers.enum';
import { MimeTypesEnum } from '../../shared/enums/mime-types.enum';

@Injectable({
  providedIn: 'root'
})
export class HttpCustomInterceptor implements HttpInterceptor {

  private httpHeaders = new HttpHeaders();

  private token!: Token;

  constructor(
    private readonly authService: AuthService
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.httpHeaders = this.httpHeaders.set(HttpHeadersEnum.ContentType, MimeTypesEnum.Json);
    this.token = this.authService.token;

    if (this.token) {
      this.httpHeaders = this.httpHeaders.set(HttpHeadersEnum.Authorization, `Bearer ${this.token.value}`);
    }

    if (req.headers.get(HttpHeadersEnum.ContentType) === MimeTypesEnum.FormData) {
      this.httpHeaders = this.httpHeaders.delete(HttpHeadersEnum.ContentType);
    }

    req = req.clone({headers: this.httpHeaders});

    return next.handle(req);
  }

}
