import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExceptionService } from '../../../shared/services/exception/exception.service';
import { HttpCrudService } from '../../../shared/services/http/crud/http-crud.service';
import { BROKER_CONFIG } from '../broker.config';
import { BrokerCreateResponse } from '../interfaces/broker-create-response.interface';
import { BrokerCreate } from '../interfaces/broker-create.interface';
import { BrokerGetAll } from '../interfaces/broker-get-all.interface';
import { BrokerUpdateResponse } from '../interfaces/broker-update-response.interface';
import { BrokerUpdate } from '../interfaces/broker-update.interface';
import { Broker } from '../interfaces/broker.interface';

@Injectable({
  providedIn: 'root'
})
export class BrokerService extends HttpCrudService<BrokerCreate, BrokerCreateResponse, BrokerGetAll, Broker, BrokerUpdate, BrokerUpdateResponse> {

  constructor(
    public readonly httpClient: HttpClient,
    public readonly exceptionService: ExceptionService
  ) {
    super(
      httpClient,
      exceptionService,
      BROKER_CONFIG.pathApiSingle,
      BROKER_CONFIG.pathApiPlural
    )
  }

  public post(type: BrokerCreate): Observable<BrokerCreateResponse> {
    throw Error('O cadastro de Corretor é FormData.');
  }

}
