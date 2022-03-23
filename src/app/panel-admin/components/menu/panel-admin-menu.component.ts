import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ANNOUNCEMENT_CONFIG } from '../../../modules/announcement/announcement.config';
import { Session } from '../../../modules/auth/models/session.interface';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { USER_CONFIG } from '../../../modules/user/user.config';
import { PanelAdminComponent } from '../../panel-admin.component';

@Component({
  selector: 'app-panel-admin-menu',
  templateUrl: './panel-admin-menu.component.html',
  styleUrls: ['./panel-admin-menu.component.scss']
})
export class PanelAdminMenuComponent {

  @Input()
  public session!: Session;

  constructor(
    public readonly authService: AuthService,
    private readonly router: Router
  ) { }

  public goAccount(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat(`${USER_CONFIG.pathFront}/account`));
  }

  public goHome(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat());
  }

  public goAnnouncement(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat(`${ANNOUNCEMENT_CONFIG.pathFront}`));
  }

  public goUsers(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat(USER_CONFIG.pathFront));
  }

}
