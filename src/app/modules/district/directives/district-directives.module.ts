import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DistrictOptionSelectDirective } from './district-option-select/district-option-select.directive';

@NgModule({
  declarations: [DistrictOptionSelectDirective],
  imports: [CommonModule],
  exports: [DistrictOptionSelectDirective]
})
export class DistrictDirectivesModule { }
