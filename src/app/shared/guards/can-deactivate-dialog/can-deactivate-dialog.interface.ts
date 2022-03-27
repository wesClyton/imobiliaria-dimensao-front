import { AngularMaterialDialogConfirmation } from '../../angular-material/dialog-confirmation/angular-material-dialog-confirmation.interface';

export interface CanDeactivateDialog extends AngularMaterialDialogConfirmation {
  canDeactivate(): boolean;
}
