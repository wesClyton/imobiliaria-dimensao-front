import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EnterpriseRoutingModule } from './enterprise-routing.module';
import { EnterprisePagesModule } from './pages/enterprise-pages.module';

@NgModule({
  imports: [
    CommonModule,
    EnterpriseRoutingModule,
    EnterprisePagesModule
  ]
})
export class EnterpriseModule { }
