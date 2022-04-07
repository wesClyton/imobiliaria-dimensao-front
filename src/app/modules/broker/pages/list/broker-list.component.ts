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
import { QueryFilterParam } from '../../../../shared/services/http/query-filter/query-filter.interface';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { BrokerGetAll } from '../../interfaces/broker-get-all.interface';
import { BrokerUpdate } from '../../interfaces/broker-update.interface';
import { Broker } from '../../interfaces/broker.interface';
import { BrokerService } from '../../services/broker.service';

@Component({
  selector: 'app-broker-list',
  templateUrl: 'broker-list.component.html',
  styleUrls: ['./broker-list.component.scss']
})
export class BrokerListComponent implements OnInit, AngularMaterialTableInputs<Broker>, CrudActionNew, CrudActionBack {

  private brokerGetAll!: BrokerGetAll;

  public tableDataSource!: MatTableDataSource<Broker>;

  public tableDisplayedColumns = ['foto', 'nome', 'email', 'telefone', 'whatsapp', 'ativo'];

  public tableActions!: AngularMaterialTableActions<Broker>;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly brokerService: BrokerService,
    private readonly notificationService: NotificationService,
    private readonly loadingService: LoadingService,
    private readonly angularMaterialDialogConfirmationService: AngularMaterialDialogConfirmationService
  ) { }

  ngOnInit(): void {
    this.brokerGetAll = this.activatedRoute.snapshot.data.brokerGetAll;
    this.tableLoadContent(this.brokerGetAll);
  }

  public createActions(broker: Broker): void {
    this.tableActions = {
      items: [
        {
          ...AngularMaterialTableActionsUtils.detailDefault(),
          action: broker => this.navigateDetail(broker)
        },
        {
          ...AngularMaterialTableActionsUtils.activeDefault(),
          action: broker => this.updateStatus(broker),
          visible: !broker.ativo
        },
        {
          ...AngularMaterialTableActionsUtils.inactiveDefault(),
          action: broker => this.updateStatus(broker),
          visible: broker.ativo
        },
        {
          ...AngularMaterialTableActionsUtils.deleteDefault(),
          action: broker => this.delete(broker)
        }
      ]
    }
  }

  private updateStatus(broker: Broker): void {
    const brokerUpdate: BrokerUpdate = {
      id: broker.id,
      ativo: !broker.ativo
    } as BrokerUpdate;

    this.brokerService.put(brokerUpdate).pipe(take(1)).subscribe(() => this.getBrokers());
  }

  private inactivate(broker: Broker): void {
    const brokerUpdate: BrokerUpdate = {
      id: broker.id,
      ativo: false
    } as BrokerUpdate;

    this.brokerService.put(brokerUpdate).pipe(take(1)).subscribe(() => this.getBrokers());
  }

  private tableLoadContent(brokers: BrokerGetAll): void {
    this.tableDataSource = new MatTableDataSource(brokers.data);
  }

  public navigateDetail(broker: Broker): void {
    this.router.navigate([`detail/${broker.id}`], { relativeTo: this.activatedRoute })
  }

  public crudActionBack(): void {
    this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
  }

  public crudActionNew(): void {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute })
  }

  private async delete(broker: Broker): Promise<void> {
    const confirmation = await this.angularMaterialDialogConfirmationService?.confirm({
      message: `Realmente deseja excluir o Corretor ${broker.nome}?`
    });
    if (!confirmation) {
      return;
    }

    this.loadingService.show();

    this.brokerService.delete(broker.id)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(() => {
        this.notificationService.success(`Corretor ${broker.nome} excluído com sucesso!`);
        this.getBrokers();
      });
  }

  public getBrokers(queryFilters: Array<QueryFilterParam> = new Array<QueryFilterParam>()): void {
    this.brokerService.queryFilterAdd(queryFilters);

    this.loadingService.show();

    this.brokerService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(brokers => this.tableLoadContent(brokers));
  }

}
