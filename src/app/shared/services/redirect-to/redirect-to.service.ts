import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedirectToService {

  private readonly pathBS = new BehaviorSubject<string>('/');

  public get lastPath(): string {
    return this.pathBS.value;
  }

  public get path(): string {
    return this.activatedRoute.snapshot.queryParams.redirectTo;
  }

  constructor(
    private readonly activatedRoute: ActivatedRoute
  ) { }

}
