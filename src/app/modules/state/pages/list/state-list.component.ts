import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudActionBack } from '../../../../shared/components/crud-actions/interfaces/crud-action-back.interface';
import { CrudActionNew } from '../../../../shared/components/crud-actions/interfaces/crud-action-new.interface';
import { UrlUtil } from '../../../../shared/utils/url.util';

@Component({
  selector: 'app-state-list',
  templateUrl: 'state-list.component.html'
})
export class StateListComponent implements CrudActionNew, CrudActionBack {

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  public crudActionBack(): void {
    this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
  }

  public crudActionNew(): void {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute })
  }

}
