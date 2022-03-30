import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../core/loading/loading.service';
import { Banner } from '../interfaces/banner-create.interface';
import { BannerService } from '../services/banner.service';

@Injectable({
  providedIn: 'root'
})
export class BannerGeByIdResolver implements Resolve<Banner> {

  constructor(
    private readonly loadingService: LoadingService,
    private readonly bannerService: BannerService
  ) { }

  public resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<Banner> {
    const id: string = activatedRouteSnapshot.params.id;
    this.loadingService.show();
    return this.bannerService
      .getById(id)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      );
  }

}
