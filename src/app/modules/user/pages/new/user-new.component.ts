import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PanelAdminComponent } from '../../../../panel-admin/panel-admin.component';
import { CrudActionBack } from '../../../../shared/components/crud-actions/interfaces/crud-action-back.interface';
import { CrudActionSave } from '../../../../shared/components/crud-actions/interfaces/crud-action-save.interface';
import { CanDeactivateDialog } from '../../../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.interface';
import { UserFormNewComponent } from '../../components/form-new/user-form-new.component';
import { USER_CONFIG } from '../../user.config';

@Component({
  selector: 'app-user-new',
  templateUrl: 'user-new.component.html'
})
export class UserNewComponent implements CrudActionSave, CrudActionBack, CanDeactivateDialog {

  @ViewChild(UserFormNewComponent, { static: false })
  private readonly userFormNewComponent!: UserFormNewComponent;

  public readonly canDeactivateMessage = 'Realmente deseja cancelar o cadastro de Usuário?';

  constructor(
    private readonly router: Router
  ) { }

  public canDeactivate(): boolean {
    return !this.userFormNewComponent.form.dirty;
  }

  public crudActionSave(): void {
    this.userFormNewComponent.submit();
  }

  public crudActionBack(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat(USER_CONFIG.pathFront));
  }

}
