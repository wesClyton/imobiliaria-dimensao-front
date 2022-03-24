import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ExceptionService } from '../../../shared/services/exception/exception.service';
import { StorageService } from '../../../shared/services/storage/storage.service';
import { AUTH_CONFIG } from '../auth.config';
import { Role } from '../enums/role.enum';
import { Login } from '../interfaces/login.interface';
import { Session } from '../interfaces/session.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly currentSession = new BehaviorSubject<Session>(this.session);

  public currentSession$ = this.currentSession.asObservable();

  public get isLogged(): boolean {
    return this.session ? true : false;
  }

  public get isAdmin(): boolean {
    return this.levelAcess === Role.Admin;
  }

  public get isAutor(): boolean {
    return this.levelAcess === Role.Autor;
  }

  public get isCorretor(): boolean {
    return this.levelAcess === Role.Corretor;
  }

  public get isLeitor(): boolean {
    return this.levelAcess === Role.Leitor;
  }

  public get session(): Session {
    return StorageService.localGetItem(AUTH_CONFIG.keySession);
  }

  private get levelAcess(): Role {
    return this.session?.usuario.nivel;
  }

  constructor(
    private readonly router: Router,
    private readonly httpClient: HttpClient,
    private readonly exceptionService: ExceptionService
  ) { }

  public login(login: Login): Observable<Session> {
    return this.httpClient.post<Session>(`${AUTH_CONFIG.pathApi}/autenticar`, login).pipe(
      tap(session => {
        this.setSessionStorage(session);
        this.currentSession.next(session);
      }),
      catchError((error) => {
        this.exceptionService.handleError(error);
        return throwError(error);
      })
    );
  }

  public logout(): void {
    StorageService.localRemoveItem(AUTH_CONFIG.keySession);
    this.router.navigateByUrl(`${AUTH_CONFIG.pathFront}/login`);
  }

  private setSessionStorage(session: Session): void {
    StorageService.localSetItem(AUTH_CONFIG.keySession, session);
  }

}
