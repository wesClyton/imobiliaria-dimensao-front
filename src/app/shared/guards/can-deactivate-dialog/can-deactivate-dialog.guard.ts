import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivate } from '@angular/router';
import { take } from 'rxjs/operators';
import { DialogConfirmationComponent } from '../../components/dialog-confirmation/dialog-confirmation.component';
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
        DialogConfirmationComponent.title = component.title || 'Confirmação!';
        DialogConfirmationComponent.message = component.message || 'Realmente deseja sair dessa página?';
        DialogConfirmationComponent.cancelButton = component.cancelButton || 'Cancelar';
        DialogConfirmationComponent.confirmButton = component.confirmButton || 'Confirmar';

        let dialog = this.matDialog.open(DialogConfirmationComponent);

        dialog.afterClosed().pipe(take(1)).subscribe(value => resolve(!value ? false : true))
      }
    });
  }

}
