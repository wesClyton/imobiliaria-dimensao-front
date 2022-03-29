import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { AngularMaterialDialogConfirmationService } from '../../../../shared/angular-material/dialog-confirmation/angular-material-dialog-confirmation.service';
import { AngularMaterialTableActions } from '../../../../shared/angular-material/table/interfaces/angular-material-table-actions.interface';
import { AngularMaterialTableInputs } from '../../../../shared/angular-material/table/interfaces/angular-material-table-inputs.interface';
import { AngularMaterialTableActionsUtils } from '../../../../shared/angular-material/table/utils/angular-material-table-actions.utils';
import { CrudActionBack } from '../../../../shared/components/crud-actions/interfaces/crud-action-back.interface';
import { CrudActionNew } from '../../../../shared/components/crud-actions/interfaces/crud-action-new.interface';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { StateGetAll } from '../../interfaces/state-get-all.interface';
import { State } from '../../interfaces/state.interface';
import { StateService } from '../../services/state.service';



@Component({
  selector: 'app-state-list',
  templateUrl: 'state-list.component.html'
})
export class StateListComponent implements OnInit, AngularMaterialTableInputs<State>, CrudActionNew, CrudActionBack {

  private stateGetAll!: StateGetAll;

  public tableDataSource!: MatTableDataSource<State>;

  public tableDisplayedColumns = ['nome', 'uf'];

  public tableActions: AngularMaterialTableActions<State> = {
    items: [
      {
        ...AngularMaterialTableActionsUtils.detailDefault(),
        action: state => this.navigateDetail(state)
      },
      {
        ...AngularMaterialTableActionsUtils.deleteDefault(),
        action: state => this.delete(state)
      }
    ]
  };

  public tableFilterInputTextPlaceholder = 'Filtre pelo nome';

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly stateService: StateService,
    private readonly notificationService: NotificationService,
    private readonly loadingService: LoadingService,
    private readonly angularMaterialDialogConfirmationService: AngularMaterialDialogConfirmationService
  ) { }

  ngOnInit(): void {
    this.stateGetAll = this.activatedRoute.snapshot.data.stateGetAll;
    this.tableLoadContent(this.stateGetAll);
  }

  private tableLoadContent(states: StateGetAll): void {
    this.tableDataSource = new MatTableDataSource(states.data);
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

    this.stateService.delete(state.id).subscribe(() => {
      this.notificationService.success(`Estado ${state.nome} excluído com sucesso!`);
      this.getStates();
    });
  }

  private getStates(): void {
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
