import { NgModule } from '@angular/core';
import { StatePagesModule } from './pages/state-pages.module';
import { StateRoutingModule } from './state-routing.module';

@NgModule({
  imports: [
    StateRoutingModule,
    StatePagesModule
  ]
})
export class StateModule { }
