import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PanelAdminComponent } from '../../../../panel-admin/panel-admin.component';
import { CrudActionBack } from '../../../../shared/components/crud-actions/interfaces/crud-action-back.interface';
import { CrudActionSave } from '../../../../shared/components/crud-actions/interfaces/crud-action-save.interface';
import { CanDeactivateDialog } from '../../../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.interface';
import { StateFormNewComponent } from '../../components/form-new/state-form-new.component';
import { STATE_CONFIG } from '../../state.config';

@Component({
  selector: 'app-state-new',
  templateUrl: 'state-new.component.html'
})
export class StateNewComponent implements CrudActionSave, CrudActionBack, CanDeactivateDialog {

  @ViewChild(StateFormNewComponent, { static: false })
  private stateFormNewComponent!: StateFormNewComponent;

  public canDeactivateMessage = 'Realmente deseja cancelar o cadastro de Estado?';

  constructor(
    private readonly router: Router
  ) { }

  public canDeactivate(): boolean {
    return !this.stateFormNewComponent.form.dirty;
  }

  public crudActionSave(): void {
    this.stateFormNewComponent.submit();
  }

  public crudActionBack(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat(STATE_CONFIG.pathFront));
  }

}
