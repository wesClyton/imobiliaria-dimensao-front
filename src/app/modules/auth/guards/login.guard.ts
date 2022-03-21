import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PAINEL_ADMIN_CONFIG } from '../../../painel-admin/painel-admin.config';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  canActivate(): boolean {
    if (this.authService.isLogged) {
      this.router.navigateByUrl(PAINEL_ADMIN_CONFIG.pathFront);
      return false;
    }
    return true;
  }

}
