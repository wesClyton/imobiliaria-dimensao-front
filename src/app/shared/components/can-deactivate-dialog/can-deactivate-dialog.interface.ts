export interface CanDeactivateDialog {
  canDeactivate(): boolean;
  canDeactivateMessage: string;
  canDeactivateTitle?: string;
  canDeactivateCancelButton?: string;
  canDeactivateConfirmButton?: string;
}
