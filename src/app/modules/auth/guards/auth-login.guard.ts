import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PANEL_ADMIN_CONFIG } from '../../../panel-admin/panel-admin.config';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  canActivate(): boolean {
    if (this.authService.isLogged) {
      this.router.navigateByUrl(PANEL_ADMIN_CONFIG.pathFront);
      return false;
    }
    return true;
  }

}
