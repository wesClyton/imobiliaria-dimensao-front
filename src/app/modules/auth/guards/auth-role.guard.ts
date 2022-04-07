import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { PAGES_CONFIG } from '../../../pages/page.config';
import { HttpStatusCode } from '../../../shared/enums/http-status-code.enum';
import { Role } from '../enums/role.enum';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  public canActivate(routeSnapshot: ActivatedRouteSnapshot): boolean {
    const roles: Array<Role> = routeSnapshot.data.roles || [];

    const canAccess = roles.some(role => role === this.authService.session.usuario.nivel);

    if (!canAccess) {
      this.router.navigate(
        [`${PAGES_CONFIG.pathFront}/erro`],
        { queryParams: { code: HttpStatusCode.Unauthorized }
      });
    }

    return canAccess;
  }

}
