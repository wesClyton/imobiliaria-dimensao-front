import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { CrudActionBack } from '../../../../shared/components/crud-actions/interfaces/crud-action-back.interface';
import { CrudActionNew } from '../../../../shared/components/crud-actions/interfaces/crud-action-new.interface';
import { DialogConfirmationService } from '../../../../shared/components/dialog-confirmation/dialog-confirmation.service';
import { TableActions } from '../../../../shared/components/table/interfaces/table-actions.interface';
import { TableInputs } from '../../../../shared/components/table/interfaces/table-inputs.interface';
import { TableActionsUtils } from '../../../../shared/components/table/utils/table-actions.utils';
import { QueryFilterParam } from '../../../../shared/services/http/query-filter/query-filter.interface';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { AuthService } from '../../../auth/services/auth.service';
import { StateGetAll } from '../../interfaces/state-get-all.interface';
import { State } from '../../interfaces/state.interface';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-state-list',
  templateUrl: 'state-list.component.html'
})
export class StateListComponent implements OnInit, TableInputs<State>, CrudActionNew, CrudActionBack {

  public stateGetAll!: StateGetAll;

  public tableDataSource!: MatTableDataSource<State>;

  public readonly tableDisplayedColumns = ['nome', 'uf'];

  public readonly tableActions: TableActions<State> = {
    items: [
      {
        ...TableActionsUtils.detailDefault(),
        action: state => this.navigateDetail(state)
      },
      {
        ...TableActionsUtils.deleteDefault(),
        action: state => this.delete(state)
      }
    ]
  };

  public readonly tableFilterInputTextPlaceholder = 'Filtre pelo nome';

  public readonly newShow = this.authService.isAdmin || this.authService.isAutor;

  public readonly tableShowActions = this.authService.isAdmin || this.authService.isAutor;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly stateService: StateService,
    private readonly notificationService: NotificationService,
    private readonly loadingService: LoadingService,
    private readonly angularMaterialDialogConfirmationService: DialogConfirmationService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.stateGetAll = this.activatedRoute.snapshot.data.stateGetAll;
    this.tableLoadContent(this.stateGetAll);
  }

  private tableLoadContent(states: StateGetAll): void {
    this.stateGetAll = states;
    this.tableDataSource = new MatTableDataSource(this.stateGetAll.data);
  }

  public navigateDetail(state: State): void {
    this.router.navigate([`detail/${state.id}`], { relativeTo: this.activatedRoute })
  }

  public crudActionBack(): void {
    this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
  }

  public crudActionNew(): void {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute })
  }

  private async delete(state: State): Promise<void> {
    const confirmation = await this.angularMaterialDialogConfirmationService?.confirm({
      message: `Realmente deseja excluir o Estado ${state.nome}?`
    });
    if (!confirmation) {
      return;
    }

    this.loadingService.show();

    this.stateService
      .delete(state.id)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(() => {
        this.notificationService.success(`Estado ${state.nome} excluído com sucesso!`);
        this.getStates();
      });
  }

  public getStates(queryFilters: Array<QueryFilterParam> = new Array<QueryFilterParam>()): void {
    this.stateService.queryFilterRemove();
    this.stateService.queryFilterAdd(queryFilters);

    this.loadingService.show();

    this.stateService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(states => this.tableLoadContent(states));
  }

}
