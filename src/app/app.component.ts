import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APP_CONFIG } from './app.config';
import { LoadingService } from './core/loading/loading.service';
import { AUTH_CONFIG } from './modules/auth/auth.config';
import { RedirectToService } from './shared/services/redirect-to/redirect-to.service';
import { StorageService } from './shared/services/storage/storage.service';
import { UrlUtil } from './shared/utils/url.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public showLoading = false;

  private subscription = new Subscription();

  private previousUrl = APP_CONFIG.pathFront;

  private currentUrl = UrlUtil.previusUrlAcessed || APP_CONFIG.pathFront;

  constructor(
    private readonly loadingService: LoadingService,
    private readonly router: Router,
    private readonly redirectToService: RedirectToService
  ) { }

  ngOnInit(): void {
    this.subscription.add(this.loadingService.observer$.subscribe(value => this.showLoading = value));

    this.subscription.add(
      this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationStart) {
          if (event.url !== `${AUTH_CONFIG.pathFront}/login`) {
            this.previousUrl = this.currentUrl;
            this.currentUrl = event.url;
            this.redirectToService.pathBS.next(this.currentUrl);
            StorageService.localSetItem(UrlUtil.keyPreviusUrlAcessed, this.previousUrl);
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
