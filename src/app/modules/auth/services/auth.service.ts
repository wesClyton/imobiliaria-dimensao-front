import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from '../../../shared/services/storage/storage.service';
import { AUTH_CONFIG } from '../auth.config';
import { RoleEnum } from '../enums/role.enum';
import { Login } from '../models/login.interface';
import { Token } from '../models/token.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly isLoggedBS: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLogged);

  public get isLogged(): boolean {
    return this.token ? true : false;
  }

  public get isAdmin(): boolean {
    return this.levelAcess === RoleEnum.ADMIN;
  }

  public get isAutor(): boolean {
    return this.levelAcess === RoleEnum.AUTOR;
  }

  public get isCorretor(): boolean {
    return this.levelAcess === RoleEnum.CORRETOR;
  }

  public get isLeitor(): boolean {
    return this.levelAcess === RoleEnum.LEITOR;
  }

  public get token(): Token {
    return StorageService.localGetItem(AUTH_CONFIG.keyToken);
  }

  private get levelAcess(): RoleEnum {
    return (this.token)?.usuario.nivel;
  }

  constructor(
    private readonly router: Router,
    private readonly httpClient: HttpClient
  ) { }

  public login(login: Login): Observable<Token> {
    return this.httpClient.post<Token>(AUTH_CONFIG.pathApi, login);
  }

  public logout(): void {
    StorageService.localRemoveItem(AUTH_CONFIG.keyToken);
    this.isLoggedBS.next(false);
    this.router.navigateByUrl(`${AUTH_CONFIG.pathFront}/login`);
  }

  public setTokenLocalStorage(token: Token): void {
    StorageService.localSetItem(AUTH_CONFIG.keyToken, JSON.stringify(token));
    this.isLoggedBS.next(true);
  }

}
