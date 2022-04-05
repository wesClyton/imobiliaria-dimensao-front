import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../core/loading/loading.service';
import { Announcement } from '../interfaces/announcement.interface';
import { AnnouncementService } from '../services/announcement.service';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementGeByIdResolver implements Resolve<Announcement> {

  constructor(
    private readonly loadingService: LoadingService,
    private readonly announcementService: AnnouncementService
  ) { }

  public resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<Announcement> {
    const id: string = activatedRouteSnapshot.params.id;
    this.loadingService.show();
    return this.announcementService
      .getById(id)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      );
  }

}
