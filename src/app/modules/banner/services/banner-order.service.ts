import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ExceptionService } from '../../../shared/services/exception/exception.service';
import { HttpPutService } from '../../../shared/services/http/put/http-put.service';
import { BANNER_CONFIG } from '../banner.config';
import { BannerOrder } from '../interfaces/banner-order.interface';

@Injectable({
  providedIn: 'root'
})
export class BannerOrderService extends HttpPutService<BannerOrder, void> {

  private readonly ordenationCompletedSubject = new Subject();

  public ordenationCompleted$ = this.ordenationCompletedSubject.asObservable();

  constructor(
    public readonly httpClient: HttpClient,
    public readonly exceptionService: ExceptionService
  ) {
    super(
      httpClient,
      exceptionService,
      `${BANNER_CONFIG.pathApiSingle}/order`
    )
  }

  public ordenationCompleted(): void {
    this.ordenationCompletedSubject.next();
  }

}
