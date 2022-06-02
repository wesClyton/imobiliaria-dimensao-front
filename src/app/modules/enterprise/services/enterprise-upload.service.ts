import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExceptionService } from '../../../shared/services/exception/exception.service';
import { HttpUploadService } from '../../../shared/services/http/upload/http-upload.service';
import { ENTERPRISE_CONFIG } from '../enterprise.config';
import { EnterpriseUpdateResponse } from '../interfaces/enterprise-update-response.interface';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseUploadService extends HttpUploadService<EnterpriseUpdateResponse> {

  constructor(
    public readonly httpClient: HttpClient,
    public readonly exceptionService: ExceptionService
  ) {
    super(
      httpClient,
      exceptionService,
      ENTERPRISE_CONFIG.pathApiSingle
    )
  }

}
