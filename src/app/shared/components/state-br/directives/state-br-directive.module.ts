import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StateBrDirective } from './state-br-option-select/state-br-option-select.directive';

@NgModule({
  declarations: [StateBrDirective],
  imports: [CommonModule],
  exports: [StateBrDirective]
})
export class StateBrDirectiveModule { }
