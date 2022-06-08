import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ExceptionService } from '../../../shared/services/exception/exception.service';
import { HttpPutService } from '../../../shared/services/http/put/http-put.service';
import { ANNOUNCEMENT_CONFIG } from '../announcement.config';
import { AnnouncementImageOrders } from '../interfaces/announcement-orders.interface';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementImageOrderService extends HttpPutService<AnnouncementImageOrders, void> {

  private readonly ordenationCompletedSubject = new Subject();

  public ordenationCompleted$ = this.ordenationCompletedSubject.asObservable();

  constructor(
    public readonly httpClient: HttpClient,
    public readonly exceptionService: ExceptionService
  ) {
    super(
      httpClient,
      exceptionService,
      `${ANNOUNCEMENT_CONFIG.pathApiSingle}/orderFotos`
    )
  }

  public ordenationCompleted(): void {
    this.ordenationCompletedSubject.next();
  }

}
