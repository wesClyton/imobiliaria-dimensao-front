import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PanelAdminComponentModule } from './components/panel-admin-component.module';
import { PanelAdminHomeComponent } from './pages/home/panel-admin-home.component';
import { PanelAdminRoutingModule } from './panel-admin-routing.module';
import { PanelAdminComponent } from './panel-admin.component';

@NgModule({
  declarations: [
    PanelAdminComponent,
    PanelAdminHomeComponent
  ],
  imports: [
    CommonModule,
    PanelAdminRoutingModule,
    PanelAdminComponentModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ]
})
export class PainelAdminModule { }
