import { DialogConfirmation } from '../../components/dialog-confirmation/dialog-confirmation.interface';

export interface CanDeactivateDialog extends DialogConfirmation {
  canDeactivate(): boolean;
}
