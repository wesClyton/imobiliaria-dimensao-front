import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../core/loading/loading.service';
import { Characteristic } from '../interfaces/characteristic.interface';
import { CharacteristicService } from '../services/characteristic.service';

@Injectable({
  providedIn: 'root'
})
export class CharacteristicGeByIdResolver implements Resolve<Characteristic> {

  constructor(
    private readonly loadingService: LoadingService,
    private readonly characteristicService: CharacteristicService
  ) { }

  public resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<Characteristic> {
    const id: string = activatedRouteSnapshot.params.id;
    this.loadingService.show();
    return this.characteristicService
      .getById(id)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      );
  }

}
