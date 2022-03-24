import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CrudActionsComponent } from './crud-actions/crud-actions.component';

@NgModule({
  declarations: [CrudActionsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  exports: [CrudActionsComponent]
})
export class SharedComponentsModule { }
