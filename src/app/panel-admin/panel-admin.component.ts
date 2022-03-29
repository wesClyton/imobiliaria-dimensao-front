import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APP_CONFIG } from '../app.config';
import { Session } from '../modules/auth/interfaces/session.interface';
import { AuthService } from '../modules/auth/services/auth.service';
import { USER_CONFIG } from '../modules/user/user.config';
import { AngularMaterialDialogConfirmationService } from '../shared/angular-material/dialog-confirmation/angular-material-dialog-confirmation.service';
import { ModuleConfig } from '../shared/interfaces/module-config.interface';
import { PANEL_ADMIN_CONFIG } from './panel-admin.config';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.scss']
})
export class PanelAdminComponent {

  public showSideNav = true;

  public session!: Session;

  public get APP_CONFIG(): ModuleConfig {
    return APP_CONFIG;
  }

  private readonly subscription = new Subscription();

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly angularMaterialDialogConfirmationService: AngularMaterialDialogConfirmationService
  ) { }

  ngOnInit(): void {
    this.subscription.add(this.authService.currentSession$.subscribe(session => this.session = session));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public async logout(): Promise<void> {
    const confirmation = await this.angularMaterialDialogConfirmationService.confirm({
      message: 'Realmente deseja sair?'
    })
    if (!confirmation) {
      return;
    }
    this.authService.logout();
  }

  public collapseSideNav(): void {
    this.showSideNav = !this.showSideNav;
  }

  public navitateAccount(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat(`${USER_CONFIG.pathFront}/account/${this.session.usuario.id}`));
  }

  public static pathConcat(path: string = ''): string {
    return `${PANEL_ADMIN_CONFIG.pathFront}${path}`;
  }

}
