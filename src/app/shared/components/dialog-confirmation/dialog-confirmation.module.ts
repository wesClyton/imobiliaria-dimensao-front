import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogConfirmationComponent } from './dialog-confirmation.component';

@NgModule({
  declarations: [DialogConfirmationComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class DialogConfirmationModule { }
