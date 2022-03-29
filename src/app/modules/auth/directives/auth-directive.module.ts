import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RoleOptionSelectDirective } from './role-option-select/role-option-select.directive';

@NgModule({
  declarations: [RoleOptionSelectDirective],
  imports: [CommonModule],
  exports: [RoleOptionSelectDirective]
})
export class AuthDirectiveModule { }
