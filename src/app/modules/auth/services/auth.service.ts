import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ExceptionService } from '../../../shared/services/exception/exception.service';
import { HttpPostService } from '../../../shared/services/http/post/http-post.service';
import { StorageService } from '../../../shared/services/storage/storage.service';
import { UserUpdateResponse } from '../../user/interfaces/user-update-response.interface';
import { AUTH_CONFIG } from '../auth.config';
import { Role } from '../enums/role.enum';
import { Login } from '../interfaces/login.interface';
import { Session } from '../interfaces/session.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpPostService<Login, Session> {

  private readonly currentSession = new BehaviorSubject<Session>(this.session);

  public readonly currentSession$ = this.currentSession.asObservable();

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
      tap(session => this.updateSession(session))
    );
  }

  public logout(): void {
    StorageService.localRemoveItem(AUTH_CONFIG.keySession);
    this.router.navigateByUrl(`${AUTH_CONFIG.pathFront}/login`);
  }

  public updateSessionStorage(user: UserUpdateResponse): void {
    let session: Session = {
      token: this.session.token,
      usuario: {
        email: user.email,
        id: user.id,
        nivel: user.nivel,
        nome: user.nome
      }
    }
    this.updateSession(session);
  }

  private updateSession(session: Session): void {
    StorageService.localSetItem(AUTH_CONFIG.keySession, session);
    this.currentSession.next(session);
  }

  public isMyAccount(userId: string): boolean {
    return this.session.usuario.id === userId;
  }

  public isCorretorOpenedIsCorretorLogged(email: string): boolean {
    return this.isCorretor && (this.session.usuario.email === email);
  }

}
