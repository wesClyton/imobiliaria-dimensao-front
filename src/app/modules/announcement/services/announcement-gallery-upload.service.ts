import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExceptionService } from '../../../shared/services/exception/exception.service';
import { HttpUploadService } from '../../../shared/services/http/upload/http-upload.service';
import { ANNOUNCEMENT_CONFIG } from '../announcement.config';
import { AnnouncementGalleryUploadResponse } from '../interfaces/announcement-galery-upload.interface';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementUploadService extends HttpUploadService<AnnouncementGalleryUploadResponse> {

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
