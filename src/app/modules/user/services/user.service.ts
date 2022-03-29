import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExceptionService } from '../../../shared/services/exception/exception.service';
import { HttpCrudService } from '../../../shared/services/http/crud/http-crud.service';
import { UserCreateResponse } from '../../user/interfaces/user-create-response.interface';
import { UserCreate } from '../../user/interfaces/user-create.interface';
import { UserGetAll } from '../../user/interfaces/user-get-all.interface';
import { UserUpdateResponse } from '../../user/interfaces/user-update-response.interface';
import { UserUpdate } from '../../user/interfaces/user-update.interface';
import { User } from '../../user/interfaces/user.interface';
import { USER_CONFIG } from '../../user/user.config';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpCrudService<UserCreate, UserCreateResponse, UserGetAll, User, UserUpdate, UserUpdateResponse> {

  constructor(
    public readonly httpClient: HttpClient,
    public readonly exceptionService: ExceptionService
  ) {
    super(
      httpClient,
      exceptionService,
      USER_CONFIG.pathApiSingle,
      USER_CONFIG.pathApiPlural
    )
  }

}
