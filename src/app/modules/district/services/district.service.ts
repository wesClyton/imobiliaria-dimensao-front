import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExceptionService } from '../../../shared/services/exception/exception.service';
import { HttpCrudService } from '../../../shared/services/http/crud/http-crud.service';
import { DISTRICT_CONFIG } from '../district.config';
import { DistrictCreateResponse } from '../interfaces/district-create-response.interface';
import { DistrictCreate } from '../interfaces/district-create.interface';
import { DistrictGetAll } from '../interfaces/district-get-all.interface';
import { DistrictUpdateResponse } from '../interfaces/district-update-response.interface';
import { DistrictUpdate } from '../interfaces/district-update.interface';
import { District } from '../interfaces/district.interface';

@Injectable({
  providedIn: 'root'
})
export class DistrictService extends HttpCrudService<DistrictCreate, DistrictCreateResponse, DistrictGetAll, District, DistrictUpdate, DistrictUpdateResponse> {

  constructor(
    public readonly httpClient: HttpClient,
    public readonly exceptionService: ExceptionService
  ) {
    super(
      httpClient,
      exceptionService,
      DISTRICT_CONFIG.pathApiSingle,
      DISTRICT_CONFIG.pathApiPlural
    )
  }

}
