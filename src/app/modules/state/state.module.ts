import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { StateListComponent } from './pages/list/state-list.component';
import { StateNewComponent } from './pages/new/state-new.component';
import { StateRoutingModule } from './state-routing.module';

@NgModule({
  declarations: [
    StateListComponent,
    StateNewComponent
  ],
  imports: [
    CommonModule,
    StateRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    SharedComponentsModule
  ]
})
export class StateModule { }
