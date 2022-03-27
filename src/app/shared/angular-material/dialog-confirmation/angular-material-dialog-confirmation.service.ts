import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularMaterialDialogConfirmationComponent } from './angular-material-dialog-confirmation.component';
import { AngularMaterialDialogConfirmation } from './angular-material-dialog-confirmation.interface';

@Injectable({
  providedIn: 'root'
})
export class AngularMaterialDialogConfirmationService {

  constructor(
    private readonly matDialog: MatDialog
  ) { }

  public async confirm(dialogConfirmation?: AngularMaterialDialogConfirmation): Promise<boolean> {
    return new Promise((resolve) => {
      AngularMaterialDialogConfirmationComponent.title = dialogConfirmation?.title || 'Confirmação!';
      AngularMaterialDialogConfirmationComponent.message = dialogConfirmation?.message || 'Realmente deseja continuar?';
      AngularMaterialDialogConfirmationComponent.cancelButton = dialogConfirmation?.cancelButton || 'Cancelar';
      AngularMaterialDialogConfirmationComponent.confirmButton = dialogConfirmation?.confirmButton || 'Confirmar';

      let dialog = this.matDialog.open(AngularMaterialDialogConfirmationComponent);

      dialog.afterClosed().subscribe(value => resolve(!value ? false : true))
    });
  }

}
