import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../core/loading/loading.service';
import { EnterpriseGetAll } from '../interfaces/enterprise-get-all.interface';
import { EnterpriseService } from '../services/enterprise.service';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseGetAllResolver implements Resolve<EnterpriseGetAll> {

  constructor(
    private readonly loadingService: LoadingService,
    private readonly enterpriseService: EnterpriseService
  ) { }

  public resolve(): Observable<EnterpriseGetAll> {
    this.loadingService.show();
    this.enterpriseService.queryFilterRemove();
    return this.enterpriseService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      );
  }

}
