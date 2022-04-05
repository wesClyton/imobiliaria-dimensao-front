import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../core/loading/loading.service';
import { AnnouncementGetAll } from '../interfaces/announcement-get-all.interface';
import { AnnouncementService } from '../services/announcement.service';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementGetAllResolver implements Resolve<AnnouncementGetAll>{

  constructor(
    private readonly loadingService: LoadingService,
    private readonly announcementService: AnnouncementService
  ) { }

  public resolve(): Observable<AnnouncementGetAll> {
    this.loadingService.show();
    return this.announcementService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      );
  }

}
