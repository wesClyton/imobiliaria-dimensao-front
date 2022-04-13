import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PanelAdminComponent } from '../../../../panel-admin/panel-admin.component';
import { CrudActionBack } from '../../../../shared/components/crud-actions/interfaces/crud-action-back.interface';
import { CrudActionSave } from '../../../../shared/components/crud-actions/interfaces/crud-action-save.interface';
import { CanDeactivateDialog } from '../../../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.interface';
import { BROKER_CONFIG } from '../../broker.config';
import { BrokerFormNewComponent } from '../../components/form-new/broker-form-new.component';

@Component({
  selector: 'app-broker-new',
  templateUrl: 'broker-new.component.html'
})
export class BrokerNewComponent implements CrudActionSave, CrudActionBack, CanDeactivateDialog {

  @ViewChild(BrokerFormNewComponent, { static: false })
  private readonly brokerFormNewComponent!: BrokerFormNewComponent;

  public readonly canDeactivateMessage = 'Realmente deseja cancelar o cadastro do Corretor?';

  constructor(
    private readonly router: Router
  ) { }

  public canDeactivate(): boolean {
    return !this.brokerFormNewComponent.form.dirty;
  }

  public crudActionSave(): void {
    this.brokerFormNewComponent.submit();
  }

  public crudActionBack(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat(BROKER_CONFIG.pathFront));
  }

}
