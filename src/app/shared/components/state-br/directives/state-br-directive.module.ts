import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StateBrOptionSelectDirective } from './state-br-option-select/state-br-option-select.directive';

@NgModule({
  declarations: [StateBrOptionSelectDirective],
  imports: [CommonModule],
  exports: [StateBrOptionSelectDirective]
})
export class StateBrDirectiveModule { }
