import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CharacteristicOptionSelectDirective } from './characteristic-option-select/characteristic-option-select.directive';
import { CharacteristicTypeOptionSelectDirective } from './characteristic-type-option-select/characteristic-type-option-select.directive';

@NgModule({
  declarations: [
    CharacteristicOptionSelectDirective,
    CharacteristicTypeOptionSelectDirective
  ],
  imports: [CommonModule],
  exports: [
    CharacteristicOptionSelectDirective,
    CharacteristicTypeOptionSelectDirective
  ]
})
export class CharacteristicDirectivesModule { }
