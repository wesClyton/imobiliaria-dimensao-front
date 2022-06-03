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
import { EnterpriseGetAll } from '../../interfaces/enterprise-get-all.interface';
import { EnterpriseUpdate } from '../../interfaces/enterprise-update.interface';
import { Enterprise } from '../../interfaces/enterprise.interface';
import { EnterpriseService } from '../../services/enterprise.service';

@Component({
  selector: 'app-enterprise-list',
  templateUrl: 'enterprise-list.component.html',
  styleUrls: ['./enterprise-list.component.scss']
})
export class EnterpriseListComponent implements OnInit, TableInputs<Enterprise>, CrudActionNew, CrudActionBack {

  public enterpriseGetAll!: EnterpriseGetAll;

  public tableDataSource!: MatTableDataSource<Enterprise>;

  public readonly tableDisplayedColumns = ['foto', 'nome', 'link', 'ativo'];

  public tableActions!: TableActions<Enterprise>;

  public readonly newShow = this.authService.isAdmin || this.authService.isAutor;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly enterpriseService: EnterpriseService,
    private readonly notificationService: NotificationService,
    private readonly loadingService: LoadingService,
    private readonly angularMaterialDialogConfirmationService: DialogConfirmationService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.enterpriseGetAll = this.activatedRoute.snapshot.data.enterpriseGetAll;
    this.tableLoadContent(this.enterpriseGetAll);
  }

  public createActions(enterprise: Enterprise): void {
    this.tableActions = {
      items: [
        {
          ...TableActionsUtils.detailDefault(),
          action: enterprise => this.navigateDetail(enterprise)
        },
        {
          ...TableActionsUtils.activeDefault(),
          action: enterprise => this.updateStatus(enterprise),
          visible: !enterprise.ativo && (this.authService.isAdmin || this.authService.isAutor)
        },
        {
          ...TableActionsUtils.inactiveDefault(),
          action: enterprise => this.updateStatus(enterprise),
          visible: enterprise.ativo && (this.authService.isAdmin || this.authService.isAutor)
        },
        {
          ...TableActionsUtils.deleteDefault(),
          action: enterprise => this.delete(enterprise),
          visible: this.authService.isAdmin || this.authService.isAutor
        }
      ]
    }
  }

  private updateStatus(enterprise: Enterprise): void {
    const enterpriseUpdate: EnterpriseUpdate = {
      id: enterprise.id,
      ativo: !enterprise.ativo
    } as EnterpriseUpdate;

    this.enterpriseService.put(enterpriseUpdate).pipe(take(1)).subscribe(() => this.getEnterprises());
  }

  private tableLoadContent(enterprises: EnterpriseGetAll): void {
    this.tableDataSource = new MatTableDataSource(enterprises.data);
  }

  public navigateDetail(enterprise: Enterprise): void {
    this.router.navigate([`detail/${enterprise.id}`], { relativeTo: this.activatedRoute })
  }

  public crudActionBack(): void {
    this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
  }

  public crudActionNew(): void {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute })
  }

  private async delete(enterprise: Enterprise): Promise<void> {
    const confirmation = await this.angularMaterialDialogConfirmationService?.confirm({
      message: `Realmente deseja excluir o Empreendimento ${enterprise.nome}?`
    });
    if (!confirmation) {
      return;
    }

    this.loadingService.show();

    this.enterpriseService.delete(enterprise.id)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(() => {
        this.notificationService.success(`Corretor ${enterprise.nome} excluído com sucesso!`);
        this.getEnterprises();
      });
  }

  public getEnterprises(queryFilters: Array<QueryFilterParam> = new Array<QueryFilterParam>()): void {
    this.enterpriseService.queryFilterRemove();
    this.enterpriseService.queryFilterAdd(queryFilters);

    this.loadingService.show();

    this.enterpriseService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(enterprises => this.tableLoadContent(enterprises));
  }

}
