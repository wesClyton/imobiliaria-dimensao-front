import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../core/loading/loading.service';
import { CharacteristicGetAll } from '../interfaces/characteristic-get-all.interface';
import { CharacteristicService } from '../services/characteristic.service';

@Injectable({
  providedIn: 'root'
})
export class CharacteristicGetAllResolver implements Resolve<CharacteristicGetAll> {

  constructor(
    private readonly loadingService: LoadingService,
    private readonly characteristicService: CharacteristicService
  ) { }

  public resolve(): Observable<CharacteristicGetAll> {
    this.loadingService.show();
    this.characteristicService.queryFilterRemove();
    return this.characteristicService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      );
  }

}
