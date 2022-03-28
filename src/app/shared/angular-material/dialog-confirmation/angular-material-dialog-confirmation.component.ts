import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog-confirmation',
  template: `
    <h1 mat-dialog-title>{{ titleValue }}</h1>
    <div mat-dialog-content>
      <p>{{ messageValue }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close cdkFocusInitial>{{ cancelButtonValue }}</button>
      <button mat-button [mat-dialog-close]="true" color="primary">{{ confirmButtonValue }}</button>
    </div>
  `,
  styles: [`
    .mat-dialog-actions {
      justify-content: end;
    }
  `]
})
export class AngularMaterialDialogConfirmationComponent {

  public static title: string;

  public static message: string;

  public static cancelButton: string;

  public static confirmButton: string;

  public get titleValue(): string {
    return AngularMaterialDialogConfirmationComponent.title;
  }

  public get messageValue(): string {
    return AngularMaterialDialogConfirmationComponent.message;
  }

  public get cancelButtonValue(): string {
    return AngularMaterialDialogConfirmationComponent.cancelButton;
  }

  public get confirmButtonValue(): string {
    return AngularMaterialDialogConfirmationComponent.confirmButton;
  }

  constructor() {}

}