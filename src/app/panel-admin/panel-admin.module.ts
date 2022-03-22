import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PanelAdminComponentModule } from './components/panel-admin-component.module';
import { HomeComponent } from './pages/home.component';
import { PanelAdminRoutingModule } from './panel-admin-routing.module';
import { PanelAdminComponent } from './panel-admin.component';

@NgModule({
  declarations: [
    PanelAdminComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    PanelAdminRoutingModule,
    PanelAdminComponentModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule
  ]
})
export class PainelAdminModule { }
