import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { NotificationService } from '../../../../core/notification/notification.service';
import { PanelAdminComponent } from '../../../../panel-admin/panel-admin.component';
import { AngularMaterialDialogConfirmationService } from '../../../../shared/angular-material/dialog-confirmation/angular-material-dialog-confirmation.service';
import { CrudActionBack } from '../../../../shared/components/crud-actions/interfaces/crud-action-back.interface';
import { CrudActionDelete } from '../../../../shared/components/crud-actions/interfaces/crud-action-delete.interface';
import { CrudActionSave } from '../../../../shared/components/crud-actions/interfaces/crud-action-save.interface';
import { CanDeactivateDialog } from '../../../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.interface';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { BROKER_CONFIG } from '../../broker.config';
import { BrokerFormDetailComponent } from '../../components/form-detail/broker-form-detail.component';
import { Broker } from '../../interfaces/broker.interface';
import { BrokerService } from '../../services/broker.service';

@Component({
  selector: 'app-broker-detail',
  templateUrl: 'broker-detail.component.html'
})
export class BrokerDetailComponent implements OnInit, CrudActionSave, CrudActionBack, CrudActionDelete, CanDeactivateDialog {

  @ViewChild(BrokerFormDetailComponent, { static: false })
  private brokerFormDetailComponent!: BrokerFormDetailComponent;

  public canDeactivateMessage = 'Realmente deseja cancelar a edição do Corretor?';

  public broker!: Broker;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificationService: NotificationService,
    private readonly brokerService: BrokerService,
    private readonly angularMaterialDialogConfirmationService: AngularMaterialDialogConfirmationService
  ) { }

  ngOnInit(): void {
    this.broker = this.activatedRoute.snapshot.data.broker;
    if (!this.broker) {
      this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
      this.notificationService.error('Corretor não encontrado!');
    }
  }

  public canDeactivate(): boolean {
    return !this.brokerFormDetailComponent.form.dirty;
  }

  public crudActionSave(): void {
    this.brokerFormDetailComponent.submit();
  }

  public crudActionBack(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat(BROKER_CONFIG.pathFront));
  }

  public async crudActionDelete(): Promise<void> {
    const confirmation = await this.angularMaterialDialogConfirmationService?.confirm({
      message: `Realmente deseja excluir o Corretor ${this.broker.nome}?`
    });
    if (!confirmation) {
      return;
    }
    this.brokerService.delete(this.broker.id).pipe(take(1)).subscribe(() => {
      this.notificationService.success(`Corretor ${this.broker.nome} excluído com sucesso!`);
      this.crudActionBack();
    });
  }

}
