import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ExceptionService } from '../../../shared/services/exception/exception.service';
import { HttpPostService } from '../../../shared/services/http/post/http-post.service';
import { StorageService } from '../../../shared/services/storage/storage.service';
import { AUTH_CONFIG } from '../auth.config';
import { Role } from '../enums/role.enum';
import { Login } from '../interfaces/login.interface';
import { Session } from '../interfaces/session.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpPostService<Login, Session> {

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
    public readonly httpClient: HttpClient,
    public readonly exceptionService: ExceptionService
  ) {
    super(httpClient, exceptionService, `${AUTH_CONFIG.pathApiSingle}/autenticar`)
  }

  public login(login: Login): Observable<Session> {
    return super.post(login).pipe(
      tap(session => {
        this.setSessionStorage(session);
        this.currentSession.next(session);
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
