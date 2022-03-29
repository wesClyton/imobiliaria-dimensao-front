import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrokerRoutingModule } from './broker-routing.module';
import { BrokerPagesModule } from './pages/broker-pages.module';

@NgModule({
  imports: [
    CommonModule,
    BrokerRoutingModule,
    BrokerPagesModule
  ]
})
export class BrokerModule { }
