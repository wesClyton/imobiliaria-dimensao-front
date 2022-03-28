import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExceptionService } from '../../../shared/services/exception/exception.service';
import { HttpCrudService } from '../../../shared/services/http/crud/http-crud.service';
import { CITY_CONFIG } from '../city.config';
import { CityCreateResponse } from '../interfaces/city-create-response.interface';
import { CityCreate } from '../interfaces/city-create.interface';
import { CityGetAll } from '../interfaces/city-get-all.interface';
import { CityUpdateResponse } from '../interfaces/city-update-response.interface';
import { CityUpdate } from '../interfaces/city-update.interface';
import { City } from '../interfaces/city.interface';

@Injectable({
  providedIn: 'root'
})
export class CityService extends HttpCrudService<CityCreate, CityCreateResponse, CityGetAll, City, CityUpdate, CityUpdateResponse> {

  constructor(
    public readonly httpClient: HttpClient,
    public readonly exceptionService: ExceptionService
  ) {
    super(
      httpClient,
      exceptionService,
      CITY_CONFIG.pathApiSingle,
      CITY_CONFIG.pathApiPlural
    )
  }

}
