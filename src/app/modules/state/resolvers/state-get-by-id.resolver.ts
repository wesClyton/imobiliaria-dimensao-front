import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../core/loading/loading.service';
import { State } from '../interfaces/state.interface';
import { StateService } from '../services/state.service';

@Injectable({
  providedIn: 'root'
})
export class StateGeByIdResolver implements Resolve<State> {

  constructor(
    private readonly loadingService: LoadingService,
    private readonly stateService: StateService
  ) { }

  public resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<State> {
    const id: string = activatedRouteSnapshot.params.id;
    this.loadingService.show();
    return this.stateService
      .getById(id)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      );
  }

}
