import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../core/loading/loading.service';
import { BrokerGetAll } from '../interfaces/broker-get-all.interface';
import { BrokerService } from '../services/broker.service';

@Injectable({
  providedIn: 'root'
})
export class BrokerGetAllResolver implements Resolve<BrokerGetAll> {

  constructor(
    private readonly loadingService: LoadingService,
    private readonly brokerService: BrokerService
  ) { }

  public resolve(): Observable<BrokerGetAll> {
    this.loadingService.show();
    return this.brokerService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      );
  }

}
