import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivate } from '@angular/router';
import { Subscription } from 'rxjs';
import { CanDeactivateDialog } from './can-deactivate-dialog.interface';
import { CanDeactivateDialogComponent } from './can-deactivate-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CanDeactivateDialog>, OnDestroy {

  private subscription = new Subscription();

  constructor(
    private readonly matDialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async canDeactivate(component: CanDeactivateDialog): Promise<boolean> {
    return await this.verify(component);
  }

  verify(component: CanDeactivateDialog): Promise<boolean> {
    return new Promise((resolve) => {
      if (component.canDeactivate()) {
        resolve(true);
      } else {
        CanDeactivateDialogComponent.title = component?.canDeactivateTitle || 'Atenção!';
        CanDeactivateDialogComponent.message = component.canDeactivateMessage || 'Realmente deseja sair dessa página?';
        CanDeactivateDialogComponent.cancelButton = component.canDeactivateCancelButton || 'Cancelar';
        CanDeactivateDialogComponent.confirmButton = component.canDeactivateConfirmButton || 'Confirmar';

        let dialog = this.matDialog.open(CanDeactivateDialogComponent);

        this.subscription.add(
          dialog.afterClosed().subscribe(value => resolve(!value ? false : true))
        );
      }
    });
  }

}
