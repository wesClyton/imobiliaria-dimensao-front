import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PanelAdminMenuComponent } from './menu/panel-admin-menu.component';

@NgModule({
  declarations: [PanelAdminMenuComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [PanelAdminMenuComponent]
})
export class PanelAdminComponentModule { }
