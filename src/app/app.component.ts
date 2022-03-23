import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingService } from './core/loading/loading.service';
import { AUTH_CONFIG } from './modules/auth/auth.config';
import { RedirectToService } from './shared/services/redirect-to/redirect-to.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public showLoading = false;

  private subscription = new Subscription();

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
            this.redirectToService.pathBS.next(event.url);
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
