import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StateOptionSelectDirective } from './state-option-select/state-option-select.directive';

@NgModule({
  declarations: [StateOptionSelectDirective],
  imports: [CommonModule],
  exports: [StateOptionSelectDirective]
})
export class StateDirectivesModule { }
