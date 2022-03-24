import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from '../../modules/auth/interfaces/session.interface';
import { AuthService } from '../../modules/auth/services/auth.service';
import { HttpHeader } from '../../shared/enums/http-header.enum';
import { MimeTypes } from '../../shared/enums/mime-types.enum';

@Injectable({
  providedIn: 'root'
})
export class HttpCustomInterceptor implements HttpInterceptor {

  private httpHeaders = new HttpHeaders();

  private session!: Session;

  constructor(
    private readonly authService: AuthService
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.httpHeaders = this.httpHeaders.set(HttpHeader.ContentType, MimeTypes.Json);
    this.session = this.authService.session;

    if (this.session) {
      this.httpHeaders = this.httpHeaders.set(HttpHeader.Authorization, `Bearer ${this.session.token}`);
    }

    if (req.headers.get(HttpHeader.ContentType) === MimeTypes.FormData) {
      this.httpHeaders = this.httpHeaders.delete(HttpHeader.ContentType);
    }

    req = req.clone({headers: this.httpHeaders});

    return next.handle(req);
  }

}
