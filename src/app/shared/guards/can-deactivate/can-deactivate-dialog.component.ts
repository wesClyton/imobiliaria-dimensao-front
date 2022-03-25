import { Component } from '@angular/core';

@Component({
  selector: 'app-can-deactivate-dialog',
  template: `
    <h1 mat-dialog-title>{{ titleValue }}</h1>
    <div mat-dialog-content>
      <p>{{ messageValue }}</p>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>{{ cancelButtonValue }}</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>{{ confirmButtonValue }}</button>
    </div>
  `
})
export class CanDeactivateDialogComponent {

  public static title: string;

  public static message: string;

  public static cancelButton: string;

  public static confirmButton: string;

  public get titleValue(): string {
    return CanDeactivateDialogComponent.title;
  }

  public get messageValue(): string {
    return CanDeactivateDialogComponent.message;
  }

  public get cancelButtonValue(): string {
    return CanDeactivateDialogComponent.cancelButton;
  }

  public get confirmButtonValue(): string {
    return CanDeactivateDialogComponent.confirmButton;
  }

  constructor() { }

  public confirm(): boolean {
    return true;
  }

  public cancel(): boolean {
    return false;
  }

}
