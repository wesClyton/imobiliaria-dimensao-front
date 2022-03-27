import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivate } from '@angular/router';
import { take } from 'rxjs/operators';
import { AngularMaterialDialogConfirmationComponent } from '../../angular-material/dialog-confirmation/angular-material-dialog-confirmation.component';
import { CanDeactivateDialog } from './can-deactivate-dialog.interface';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CanDeactivateDialog> {

  constructor(
    private readonly matDialog: MatDialog
  ) {}

  public async canDeactivate(component: CanDeactivateDialog): Promise<boolean> {
    return await this.verify(component);
  }

  private verify(component: CanDeactivateDialog): Promise<boolean> {
    return new Promise((resolve) => {
      if (component.canDeactivate()) {
        resolve(true);
      } else {
        AngularMaterialDialogConfirmationComponent.title = component.title || 'Atenção!';
        AngularMaterialDialogConfirmationComponent.message = component.message || 'Realmente deseja sair dessa página?';
        AngularMaterialDialogConfirmationComponent.cancelButton = component.cancelButton || 'Cancelar';
        AngularMaterialDialogConfirmationComponent.confirmButton = component.confirmButton || 'Confirmar';

        let dialog = this.matDialog.open(AngularMaterialDialogConfirmationComponent);

        dialog.afterClosed().pipe(take(1)).subscribe(value => resolve(!value ? false : true))
      }
    });
  }

}
