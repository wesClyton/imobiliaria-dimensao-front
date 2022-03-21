import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading-component',
  template: `showLoading: {{ this.showLoading }}`
})
export class LoadingComponent implements OnInit, OnDestroy {

  public showLoading = false;

  private subscription = new Subscription();

  constructor(
    private readonly loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.subscription.add(this.loadingService.observer$.subscribe(value => this.showLoading = value));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
