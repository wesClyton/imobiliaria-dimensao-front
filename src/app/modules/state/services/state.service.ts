import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExceptionService } from '../../../shared/services/exception/exception.service';
import { HttpCrudService } from '../../../shared/services/http/crud/http-crud.service';
import { StateCreateResponse } from '../interfaces/state-create-response.interface';
import { StateCreate } from '../interfaces/state-create.interface';
import { StateGetAll } from '../interfaces/state-get-all.interface';
import { StateUpdateResponse } from '../interfaces/state-update-response.interface';
import { StateUpdate } from '../interfaces/state-update.interface';
import { State } from '../interfaces/state.interface';
import { STATE_CONFIG } from '../state.config';

@Injectable({
  providedIn: 'root'
})
export class StateService extends HttpCrudService<StateCreate, StateCreateResponse, StateGetAll, State, StateUpdate, StateUpdateResponse> {

  constructor(
    public readonly httpClient: HttpClient,
    public readonly exceptionService: ExceptionService
  ) {
    super(
      httpClient,
      exceptionService,
      STATE_CONFIG.pathApiSingle,
      STATE_CONFIG.pathApiPlural
    )
  }

}
