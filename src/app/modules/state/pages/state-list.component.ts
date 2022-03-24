import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudActionBack } from '../../../shared/components/crud-actions/interfaces/crud-action-back.interface';
import { CrudActionNew } from '../../../shared/components/crud-actions/interfaces/crud-action-new.interface';

@Component({
  selector: 'app-state-list',
  templateUrl: 'state-list.component.html'
})
export class StateListComponent implements CrudActionNew, CrudActionBack {

  constructor(
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location
  ) { }

  public crudActionBack(): void {
    this.location.back();
  }

  public crudActionNew(): void {
    this.router.navigate(['new'], { relativeTo: this.activateRoute })
  }

}
