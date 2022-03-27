import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../core/loading/loading.service';
import { StateGetAll } from '../interfaces/state-get-all.interface';
import { StateService } from '../services/state.service';

@Injectable({
  providedIn: 'root'
})
export class StateGetAllResolver implements Resolve<StateGetAll> {

  constructor(
    private readonly loadingService: LoadingService,
    private readonly stateService: StateService
  ) { }

  public resolve(): Observable<StateGetAll> {
    this.loadingService.show();
    return this.stateService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      );
  }

}
