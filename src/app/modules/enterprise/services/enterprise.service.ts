import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExceptionService } from '../../../shared/services/exception/exception.service';
import { HttpCrudService } from '../../../shared/services/http/crud/http-crud.service';
import { ENTERPRISE_CONFIG } from '../enterprise.config';
import { EnterpriseCreateResponse } from '../interfaces/enterprise-create-response.interface';
import { EnterpriseCreate } from '../interfaces/enterprise-create.interface';
import { EnterpriseGetAll } from '../interfaces/enterprise-get-all.interface';
import { EnterpriseUpdateResponse } from '../interfaces/enterprise-update-response.interface';
import { EnterpriseUpdate } from '../interfaces/enterprise-update.interface';
import { Enterprise } from '../interfaces/enterprise.interface';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService extends HttpCrudService<EnterpriseCreate, EnterpriseCreateResponse, EnterpriseGetAll, Enterprise, EnterpriseUpdate, EnterpriseUpdateResponse> {

  constructor(
    public readonly httpClient: HttpClient,
    public readonly exceptionService: ExceptionService
  ) {
    super(
      httpClient,
      exceptionService,
      ENTERPRISE_CONFIG.pathApiSingle,
      ENTERPRISE_CONFIG.pathApiPlural
    )
  }

}
