import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from '../../../modules/auth/models/session.interface';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { PANEL_ADMIN_CONFIG } from '../../panel-admin.config';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @Input()
  public session!: Session;

  constructor(
    public readonly authService: AuthService,
    private readonly router: Router,
    private readonly activatedRouter: ActivatedRoute
  ) { }

  public goHome(): void {
    this.router.navigate([PANEL_ADMIN_CONFIG.pathFront], { relativeTo: this.activatedRouter });
  }

  public goUser(): void {
    this.router.navigate(['asdasd'], { relativeTo: this.activatedRouter });
  }

}
