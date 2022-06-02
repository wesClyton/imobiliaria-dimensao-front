import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PanelAdminComponent } from '../../../../panel-admin/panel-admin.component';
import { CrudActionBack } from '../../../../shared/components/crud-actions/interfaces/crud-action-back.interface';
import { CrudActionSave } from '../../../../shared/components/crud-actions/interfaces/crud-action-save.interface';
import { CanDeactivateDialog } from '../../../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.interface';
import { ENTERPRISE_CONFIG } from '../../enterprise.config';
import { EnterpriseFormNewComponent } from '../../components/form-new/enterprise-form-new.component';

@Component({
  selector: 'app-enterprise-new',
  templateUrl: 'enterprise-new.component.html'
})
export class EnterpriseNewComponent implements CrudActionSave, CrudActionBack, CanDeactivateDialog {

  @ViewChild(EnterpriseFormNewComponent, { static: false })
  private readonly enterpriseFormNewComponent!: EnterpriseFormNewComponent;

  public readonly canDeactivateMessage = 'Realmente deseja cancelar o cadastro do Corretor?';

  constructor(
    private readonly router: Router
  ) { }

  public canDeactivate(): boolean {
    return !this.enterpriseFormNewComponent.form.dirty;
  }

  public crudActionSave(): void {
    this.enterpriseFormNewComponent.submit();
  }

  public crudActionBack(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat(ENTERPRISE_CONFIG.pathFront));
  }

}
