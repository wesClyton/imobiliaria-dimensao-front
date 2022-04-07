import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationComponent } from './dialog-confirmation.component';
import { DialogConfirmation } from './dialog-confirmation.interface';

@Injectable({
  providedIn: 'root'
})
export class DialogConfirmationService {

  constructor(
    private readonly matDialog: MatDialog
  ) { }

  public async confirm(dialogConfirmation?: DialogConfirmation): Promise<boolean> {
    return new Promise((resolve) => {
      DialogConfirmationComponent.title = dialogConfirmation?.title || 'Confirmação!';
      DialogConfirmationComponent.message = dialogConfirmation?.message || 'Realmente deseja continuar?';
      DialogConfirmationComponent.cancelButton = dialogConfirmation?.cancelButton || 'Cancelar';
      DialogConfirmationComponent.confirmButton = dialogConfirmation?.confirmButton || 'Confirmar';

      let dialog = this.matDialog.open(DialogConfirmationComponent);

      dialog.afterClosed().subscribe(value => resolve(!value ? false : true))
    });
  }

}
