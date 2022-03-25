import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CanDeactivateDialogComponent } from './can-deactivate-dialog.component';

@NgModule({
  declarations: [CanDeactivateDialogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class CanDeactivateModule { }
