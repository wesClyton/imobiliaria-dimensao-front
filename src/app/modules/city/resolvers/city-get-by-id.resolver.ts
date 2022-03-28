import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../core/loading/loading.service';
import { City } from '../interfaces/city.interface';
import { CityService } from '../services/city.service';

@Injectable({
  providedIn: 'root'
})
export class CityGeByIdResolver implements Resolve<City> {

  constructor(
    private readonly loadingService: LoadingService,
    private readonly cityService: CityService
  ) { }

  public resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<City> {
    const id: string = activatedRouteSnapshot.params.id;
    this.loadingService.show();
    return this.cityService
      .getById(id)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      );
  }

}
