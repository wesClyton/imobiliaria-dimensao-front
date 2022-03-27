import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AngularMaterialDialogConfirmationComponent } from './angular-material-dialog-confirmation.component';

@NgModule({
  declarations: [AngularMaterialDialogConfirmationComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class AngularMaterialDialogConfirmationModule { }
