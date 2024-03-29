import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { PanelAdminComponent } from '../../../../panel-admin/panel-admin.component';
import { CrudActionBack } from '../../../../shared/components/crud-actions/interfaces/crud-action-back.interface';
import { CrudActionDelete } from '../../../../shared/components/crud-actions/interfaces/crud-action-delete.interface';
import { CrudActionSave } from '../../../../shared/components/crud-actions/interfaces/crud-action-save.interface';
import { DialogConfirmationService } from '../../../../shared/components/dialog-confirmation/dialog-confirmation.service';
import { CanDeactivateDialog } from '../../../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.interface';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { AuthService } from '../../../auth/services/auth.service';
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
  private readonly brokerFormDetailComponent!: BrokerFormDetailComponent;

  public readonly canDeactivateMessage = 'Realmente deseja cancelar a edição do Corretor?';

  public broker!: Broker;

  public get saveShow(): boolean {
    return this.authService.isAdmin || this.authService.isAutor || this.authService.isCorretorOpenedIsCorretorLogged(this.broker.email);
  }

  public get deleteShow(): boolean {
    return this.authService.isAdmin || this.authService.isAutor;
  }

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificationService: NotificationService,
    private readonly brokerService: BrokerService,
    private readonly angularMaterialDialogConfirmationService: DialogConfirmationService,
    private readonly loadingService: LoadingService,
    private readonly authService: AuthService
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

    this.loadingService.show();

    this.brokerService
      .delete(this.broker.id)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(() => {
        this.notificationService.success(`Corretor ${this.broker.nome} excluído com sucesso!`);
        this.crudActionBack();
      });
  }

}
