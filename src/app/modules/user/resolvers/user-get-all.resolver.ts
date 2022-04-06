import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../core/loading/loading.service';
import { UserGetAll } from '../interfaces/user-get-all.interface';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGetAllResolver implements Resolve<UserGetAll> {

  constructor(
    private readonly loadingService: LoadingService,
    private readonly userService: UserService
  ) { }

  public resolve(): Observable<UserGetAll> {
    this.loadingService.show();
    this.userService.queryFilterRemove();
    return this.userService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      );
  }

}
