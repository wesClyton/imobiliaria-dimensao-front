import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { CepDirective } from './cep/cep.directive';
import { M2Directive } from './m2/m2.directive';
import { PhoneDirective } from './phone/phone.directive';

@NgModule({
  declarations: [
    PhoneDirective,
    CepDirective,
    M2Directive
  ],
  imports: [NgxMaskModule.forRoot()],
  exports: [
    PhoneDirective,
    CepDirective,
    M2Directive
  ]
})
export class DirectivesModule {}
