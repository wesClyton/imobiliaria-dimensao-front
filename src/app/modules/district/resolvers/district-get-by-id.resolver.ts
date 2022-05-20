import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../core/loading/loading.service';
import { District } from '../interfaces/district.interface';
import { DistrictService } from '../services/district.service';

@Injectable({
  providedIn: 'root'
})
export class DistrictGeByIdResolver implements Resolve<District> {

  constructor(
    private readonly loadingService: LoadingService,
    private readonly districtService: DistrictService
  ) { }

  public resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<District> {
    const id: string = activatedRouteSnapshot.params.id;
    this.loadingService.show();
    return this.districtService
      .getById(id)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      );
  }

}
