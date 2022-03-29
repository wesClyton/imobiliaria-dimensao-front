import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExceptionService } from '../../../shared/services/exception/exception.service';
import { HttpCrudService } from '../../../shared/services/http/crud/http-crud.service';
import { CHARACTERISTIC_CONFIG } from '../characteristic.config';
import { CharacteristicCreateResponse } from '../interfaces/characteristic-create-response.interface';
import { CharacteristicCreate } from '../interfaces/characteristic-create.interface';
import { CharacteristicGetAll } from '../interfaces/characteristic-get-all.interface';
import { CharacteristicUpdateResponse } from '../interfaces/characteristic-update-response.interface';
import { CharacteristicUpdate } from '../interfaces/characteristic-update.interface';
import { Characteristic } from '../interfaces/characteristic.interface';

@Injectable({
  providedIn: 'root'
})
export class CharacteristicService extends HttpCrudService<CharacteristicCreate, CharacteristicCreateResponse, CharacteristicGetAll, Characteristic, CharacteristicUpdate, CharacteristicUpdateResponse> {

  constructor(
    public readonly httpClient: HttpClient,
    public readonly exceptionService: ExceptionService
  ) {
    super(
      httpClient,
      exceptionService,
      CHARACTERISTIC_CONFIG.pathApiSingle,
      CHARACTERISTIC_CONFIG.pathApiPlural
    )
  }

}
