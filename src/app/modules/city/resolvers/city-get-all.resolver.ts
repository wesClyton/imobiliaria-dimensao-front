import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../core/loading/loading.service';
import { CityGetAll } from '../interfaces/city-get-all.interface';
import { CityService } from '../services/city.service';

@Injectable({
  providedIn: 'root'
})
export class CityGetAllResolver implements Resolve<CityGetAll> {

  constructor(
    private readonly loadingService: LoadingService,
    private readonly cityService: CityService
  ) { }

  public resolve(): Observable<CityGetAll> {
    this.loadingService.show();
    return this.cityService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      );
  }

}
