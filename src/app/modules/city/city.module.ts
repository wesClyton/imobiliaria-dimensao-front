import { NgModule } from '@angular/core';
import { CityRoutingModule } from './city-routing.module';
import { CityPagesModule } from './pages/city-pages.module';

@NgModule({
  imports: [
    CityRoutingModule,
    CityPagesModule
  ]
})
export class CityModule { }
