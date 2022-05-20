import { NgModule } from '@angular/core';
import { DistrictRoutingModule } from './district-routing.module';
import { DistrictPagesModule } from './pages/district-pages.module';

@NgModule({
  imports: [
    DistrictRoutingModule,
    DistrictPagesModule
  ]
})
export class DistrictModule { }
