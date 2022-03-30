import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExceptionService } from '../../../shared/services/exception/exception.service';
import { HttpUploadService } from '../../../shared/services/http/upload/http-upload.service';
import { BANNER_CONFIG } from '../banner.config';
import { BannerUpdateResponse } from '../interfaces/banner-update-response.interface';

@Injectable({
  providedIn: 'root'
})
export class BannerUploadService extends HttpUploadService<BannerUpdateResponse> {

  constructor(
    public readonly httpClient: HttpClient,
    public readonly exceptionService: ExceptionService
  ) {
    super(
      httpClient,
      exceptionService,
      BANNER_CONFIG.pathApiSingle
    )
  }

}
