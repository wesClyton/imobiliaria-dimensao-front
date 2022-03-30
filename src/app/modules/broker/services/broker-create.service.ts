import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExceptionService } from '../../../shared/services/exception/exception.service';
import { HttpUploadService } from '../../../shared/services/http/upload/http-upload.service';
import { BROKER_CONFIG } from '../broker.config';
import { BrokerCreateResponse } from '../interfaces/broker-create-response.interface';

@Injectable({
  providedIn: 'root'
})
export class BrokerCreateService extends HttpUploadService<BrokerCreateResponse> {

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
