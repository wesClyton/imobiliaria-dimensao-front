import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../core/loading/loading.service';
import { Enterprise } from '../interfaces/enterprise.interface';
import { EnterpriseService } from '../services/enterprise.service';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseGeByIdResolver implements Resolve<Enterprise> {

  constructor(
    private readonly loadingService: LoadingService,
    private readonly enterpriseService: EnterpriseService
  ) { }

  public resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<Enterprise> {
    const id: string = activatedRouteSnapshot.params.id;
    this.loadingService.show();
    return this.enterpriseService
      .getById(id)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      );
  }

}
