import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExceptionService } from '../../../shared/services/exception/exception.service';
import { HttpUploadService } from '../../../shared/services/http/upload/http-upload.service';
import { BROKER_CONFIG } from '../broker.config';
import { BrokerUpdateResponse } from '../interfaces/broker-update-response.interface';

@Injectable({
  providedIn: 'root'
})
export class BrokerUploadService extends HttpUploadService<BrokerUpdateResponse> {

  constructor(
    public readonly httpClient: HttpClient,
    public readonly exceptionService: ExceptionService
  ) {
    super(
      httpClient,
      exceptionService,
      BROKER_CONFIG.pathApiSingle
    )
  }

}
