import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../core/loading/loading.service';
import { User } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGeByIdResolver implements Resolve<User> {

  constructor(
    private readonly loadingService: LoadingService,
    private readonly userService: UserService
  ) { }

  public resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<User> {
    const id: string = activatedRouteSnapshot.params.id;
    this.loadingService.show();
    return this.userService
      .getById(id)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      );
  }

}
