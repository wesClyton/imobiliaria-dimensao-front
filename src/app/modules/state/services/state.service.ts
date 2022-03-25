import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExceptionService } from '../../../shared/services/exception/exception.service';
import { HttpCrudService } from '../../../shared/services/http/crud/http-crud.service';
import { StateGetAll } from '../interfaces/state-get-all.interface';
import { StateGetById } from '../interfaces/state-get-by-id.interface';
import { StatePostIn } from '../interfaces/state-post-in.interface';
import { StatePostOut } from '../interfaces/state-post-out.interface';
import { StatePutIn } from '../interfaces/state-put-in.interface';
import { StatePutOut } from '../interfaces/state-put-out.interface';
import { STATE_CONFIG } from '../state.config';

@Injectable({
  providedIn: 'root'
})
export class StateService extends HttpCrudService<StatePostIn, StatePostOut, StateGetAll, StateGetById, StatePutIn, StatePutOut> {

  constructor(
    public readonly httpClient: HttpClient,
    public readonly exceptionService: ExceptionService
  ) {
    super(
      httpClient,
      exceptionService,
      `${STATE_CONFIG.pathApi}/estado`,
      `${STATE_CONFIG.pathApi}/estados`
    )
  }

}
