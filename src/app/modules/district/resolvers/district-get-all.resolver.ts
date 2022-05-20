import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../core/loading/loading.service';
import { DistrictGetAll } from '../interfaces/district-get-all.interface';
import { DistrictService } from '../services/district.service';

@Injectable({
  providedIn: 'root'
})
export class DistrictGetAllResolver implements Resolve<DistrictGetAll> {

  constructor(
    private readonly loadingService: LoadingService,
    private readonly districtService: DistrictService
  ) { }

  public resolve(): Observable<DistrictGetAll> {
    this.loadingService.show();
    this.districtService.queryFilterRemove();
    return this.districtService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      );
  }

}
