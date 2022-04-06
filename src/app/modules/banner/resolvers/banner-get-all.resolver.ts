import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../core/loading/loading.service';
import { BannerGetAll } from '../interfaces/banner-get-all.interface';
import { BannerService } from '../services/banner.service';

@Injectable({
  providedIn: 'root'
})
export class BannerGetAllResolver implements Resolve<BannerGetAll>{

  constructor(
    private readonly loadingService: LoadingService,
    private readonly bannerService: BannerService
  ) { }

  public resolve(): Observable<BannerGetAll> {
    this.loadingService.show();
    this.bannerService.queryFilterRemove();
    return this.bannerService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      );
  }

}
