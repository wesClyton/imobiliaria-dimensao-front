import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivate } from '@angular/router';
import { take } from 'rxjs/operators';
import { CanDeactivateDialogComponent } from './can-deactivate-dialog.component';
import { CanDeactivateDialog } from './can-deactivate-dialog.interface';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CanDeactivateDialog> {

  constructor(
    private readonly matDialog: MatDialog
  ) {}

  async canDeactivate(component: CanDeactivateDialog): Promise<boolean> {
    return await this.verify(component);
  }

  private verify(component: CanDeactivateDialog): Promise<boolean> {
    return new Promise((resolve) => {
      if (component.canDeactivate()) {
        resolve(true);
      } else {
        CanDeactivateDialogComponent.title = component?.canDeactivateTitle || 'Atenção!';
        CanDeactivateDialogComponent.message = component.canDeactivateMessage || 'Realmente deseja sair dessa página?';
        CanDeactivateDialogComponent.cancelButton = component.canDeactivateCancelButton || 'Cancelar';
        CanDeactivateDialogComponent.confirmButton = component.canDeactivateConfirmButton || 'Confirmar';

        let dialog = this.matDialog.open(CanDeactivateDialogComponent);

        dialog.afterClosed().pipe(take(1)).subscribe(value => resolve(!value ? false : true))
      }
    });
  }

}
