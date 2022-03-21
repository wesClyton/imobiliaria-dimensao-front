import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { RedirectToService } from '../../../shared/services/redirect-to/redirect-to.service';
import { AUTH_CONFIG } from '../auth.config';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  private get canAccess(): boolean {
    if (!this.authService.isLogged) {
      this.notificationService.warning('Para acessar essa página é necessário fazer o login.');
      this.router.navigate(
        [`${AUTH_CONFIG.pathFront}/login`],
        {
          queryParams: {
            redirectTo: this.redirectToService.lastPath
          }
        });
      return false;
    }
    return true;
  }

  constructor(
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService,
    private readonly redirectToService: RedirectToService
  ) { }

  canLoad(): boolean {
    return this.canAccess;
  }

  canActivate(): boolean {
    return this.canAccess;
  }
}
