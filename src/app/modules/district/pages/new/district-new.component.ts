import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PanelAdminComponent } from '../../../../panel-admin/panel-admin.component';
import { CrudActionBack } from '../../../../shared/components/crud-actions/interfaces/crud-action-back.interface';
import { CrudActionSave } from '../../../../shared/components/crud-actions/interfaces/crud-action-save.interface';
import { CanDeactivateDialog } from '../../../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.interface';
import { DISTRICT_CONFIG } from '../../district.config';
import { DistrictFormNewComponent } from '../../components/form-new/district-form-new.component';

@Component({
  selector: 'app-district-new',
  templateUrl: 'district-new.component.html'
})
export class DistrictNewComponent implements CrudActionSave, CrudActionBack, CanDeactivateDialog {

  @ViewChild(DistrictFormNewComponent, { static: false })
  private readonly districtFormNewComponent!: DistrictFormNewComponent;

  public readonly canDeactivateMessage = 'Realmente deseja cancelar o cadastro do Bairro?';

  constructor(
    private readonly router: Router
  ) { }

  public canDeactivate(): boolean {
    return !this.districtFormNewComponent.form.dirty;
  }

  public crudActionSave(): void {
    this.districtFormNewComponent.submit();
  }

  public crudActionBack(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat(DISTRICT_CONFIG.pathFront));
  }

}
