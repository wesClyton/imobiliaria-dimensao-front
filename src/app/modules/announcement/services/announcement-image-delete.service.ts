import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExceptionService } from '../../../shared/services/exception/exception.service';
import { HttpDeleteService } from '../../../shared/services/http/delete/http-delete.service';
import { ANNOUNCEMENT_CONFIG } from '../announcement.config';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementImageDeleteService extends HttpDeleteService {

  constructor(
    public readonly httpClient: HttpClient,
    public readonly exceptionService: ExceptionService
  ) {
    super(
      httpClient,
      exceptionService,
      ANNOUNCEMENT_CONFIG.pathUpload
    )
  }

}
