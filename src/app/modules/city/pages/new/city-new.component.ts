import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PanelAdminComponent } from '../../../../panel-admin/panel-admin.component';
import { CrudActionBack } from '../../../../shared/components/crud-actions/interfaces/crud-action-back.interface';
import { CrudActionSave } from '../../../../shared/components/crud-actions/interfaces/crud-action-save.interface';
import { CanDeactivateDialog } from '../../../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.interface';
import { CITY_CONFIG } from '../../city.config';
import { CityFormNewComponent } from '../../components/form-new/city-form-new.component';

@Component({
  selector: 'app-city-new',
  templateUrl: 'city-new.component.html'
})
export class CityNewComponent implements CrudActionSave, CrudActionBack, CanDeactivateDialog {

  @ViewChild(CityFormNewComponent, { static: false })
  private cityFormNewComponent!: CityFormNewComponent;

  public canDeactivateMessage = 'Realmente deseja cancelar o cadastro da Cidade?';

  constructor(
    private readonly router: Router
  ) { }

  public canDeactivate(): boolean {
    return !this.cityFormNewComponent.form.dirty;
  }

  public crudActionSave(): void {
    this.cityFormNewComponent.submit();
  }

  public crudActionBack(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat(CITY_CONFIG.pathFront));
  }

}
