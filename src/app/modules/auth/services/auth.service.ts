import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../../../shared/services/storage/storage.service';
import { AUTH_CONFIG } from '../auth.config';
import { Role } from '../enums/role.enum';
import { Login } from '../models/login.interface';
import { Session } from '../models/session.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
    return (this.session)?.usuario.nivel;
  }

  constructor(
    private readonly router: Router,
    private readonly httpClient: HttpClient
  ) { }

  public login(login: Login): Observable<Session> {
    return this.httpClient.post<Session>(`${AUTH_CONFIG.pathApi}/autenticar`, login);
  }

  public logout(): void {
    StorageService.localRemoveItem(AUTH_CONFIG.keySession);
    this.router.navigateByUrl(`${AUTH_CONFIG.pathFront}/login`);
  }

  public setSessionLocalStorage(session: Session): void {
    StorageService.localSetItem(AUTH_CONFIG.keySession, JSON.stringify(session));
  }

}
