import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ANNOUNCEMENT_CONFIG } from '../../../modules/announcement/announcement.config';
import { Session } from '../../../modules/auth/interfaces/session.interface';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { BANNER_CONFIG } from '../../../modules/banner/banner.config';
import { BROKER_CONFIG } from '../../../modules/broker/broker.config';
import { CITY_CONFIG } from '../../../modules/city/city.config';
import { STATE_CONFIG } from '../../../modules/state/state.config';
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

  public get showAnnouncement(): boolean {
    return this.authService.isAdmin;
  }

  public get showBanners(): boolean {
    return this.authService.isAdmin;
  }

  public get showBrokers(): boolean {
    return this.authService.isAdmin;
  }

  public get showCities(): boolean {
    return this.authService.isAdmin;
  }

  public get showStates(): boolean {
    return this.authService.isAdmin;
  }

  public get showUsers(): boolean {
    return this.authService.isAdmin;
  }

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  public navigateAccount(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat(`${USER_CONFIG.pathFront}/account`));
  }

  public navigateHome(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat());
  }

  public navigateAnnouncement(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat(ANNOUNCEMENT_CONFIG.pathFront));
  }

  public navigateBanners(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat(BANNER_CONFIG.pathFront));
  }

  public navigateBrokers(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat(BROKER_CONFIG.pathFront));
  }

  public navigateCities(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat(CITY_CONFIG.pathFront));
  }

  public navigateStates(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat(STATE_CONFIG.pathFront));
  }

  public navigateUsers(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat(USER_CONFIG.pathFront));
  }

}
