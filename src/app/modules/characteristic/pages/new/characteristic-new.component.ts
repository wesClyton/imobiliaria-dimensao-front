import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PanelAdminComponent } from '../../../../panel-admin/panel-admin.component';
import { CrudActionBack } from '../../../../shared/components/crud-actions/interfaces/crud-action-back.interface';
import { CrudActionSave } from '../../../../shared/components/crud-actions/interfaces/crud-action-save.interface';
import { CanDeactivateDialog } from '../../../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.interface';
import { CHARACTERISTIC_CONFIG } from '../../characteristic.config';
import { CharacteristicFormNewComponent } from '../../components/form-new/characteristic-form-new.component';

@Component({
  selector: 'app-characteristic-new',
  templateUrl: 'characteristic-new.component.html'
})
export class CharacteristicNewComponent implements CrudActionSave, CrudActionBack, CanDeactivateDialog {

  @ViewChild(CharacteristicFormNewComponent, { static: false })
  private readonly characteristicFormNewComponent!: CharacteristicFormNewComponent;

  public readonly canDeactivateMessage = 'Realmente deseja cancelar o cadastro da Característica?';

  constructor(
    private readonly router: Router
  ) { }

  public canDeactivate(): boolean {
    return !this.characteristicFormNewComponent.form.dirty;
  }

  public crudActionSave(): void {
    this.characteristicFormNewComponent.submit();
  }

  public crudActionBack(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat(CHARACTERISTIC_CONFIG.pathFront));
  }

}
