import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../core/loading/loading.service';
import { Broker } from '../interfaces/broker.interface';
import { BrokerService } from '../services/broker.service';

@Injectable({
  providedIn: 'root'
})
export class BrokerGeByIdResolver implements Resolve<Broker> {

  constructor(
    private readonly loadingService: LoadingService,
    private readonly brokerService: BrokerService
  ) { }

  public resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<Broker> {
    const id: string = activatedRouteSnapshot.params.id;
    this.loadingService.show();
    return this.brokerService
      .getById(id)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      );
  }

}
