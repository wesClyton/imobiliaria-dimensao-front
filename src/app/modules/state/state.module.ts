import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { StateListComponent } from './pages/state-list.component';
import { StateRoutingModule } from './state-routing.module';

@NgModule({
  declarations: [StateListComponent],
  imports: [
    CommonModule,
    StateRoutingModule,
    SharedComponentsModule
  ],
  exports: []
})
export class StateModule { }
