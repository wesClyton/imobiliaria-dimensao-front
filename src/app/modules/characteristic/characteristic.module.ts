import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CharacteristicRoutingModule } from './characteristic-routing.module';
import { CharacteristicPagesModule } from './pages/characteristic-pages.module';

@NgModule({
  imports: [
    CommonModule,
    CharacteristicRoutingModule,
    CharacteristicPagesModule
  ]
})
export class CharacteristicModule { }
