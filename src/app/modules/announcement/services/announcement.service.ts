import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExceptionService } from '../../../shared/services/exception/exception.service';
import { HttpCrudService } from '../../../shared/services/http/crud/http-crud.service';
import { ANNOUNCEMENT_CONFIG } from '../announcement.config';
import { AnnouncementCreateResponse } from '../interfaces/announcement-create-response.interface';
import { AnnouncementCreate } from '../interfaces/announcement-create.interface';
import { AnnouncementGetAll } from '../interfaces/announcement-get-all.interface';
import { AnnouncementUpdateResponse } from '../interfaces/announcement-update-response.interface';
import { AnnouncementUpdate } from '../interfaces/announcement-update.interface';
import { Announcement } from '../interfaces/announcement.interface';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService extends HttpCrudService<AnnouncementCreate, AnnouncementCreateResponse, AnnouncementGetAll, Announcement, AnnouncementUpdate, AnnouncementUpdateResponse> {

  constructor(
    public readonly httpClient: HttpClient,
    public readonly exceptionService: ExceptionService
  ) {
    super(
      httpClient,
      exceptionService,
      ANNOUNCEMENT_CONFIG.pathApiSingle,
      ANNOUNCEMENT_CONFIG.pathApiPlural
    )
  }

}
