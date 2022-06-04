import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { CepDirective } from './cep/cep.directive';
import { CurrencyBrDirective } from './currency-br/currency-br.directive';
import { M2Directive } from './m2/m2.directive';
import { PhoneDirective } from './phone/phone.directive';
import { UpperCaseDirective } from './uppercase/uppercase.directive';

@NgModule({
  declarations: [
    PhoneDirective,
    CepDirective,
    M2Directive,
    CurrencyBrDirective,
    UpperCaseDirective
  ],
  imports: [NgxMaskModule.forRoot()],
  exports: [
    PhoneDirective,
    CepDirective,
    M2Directive,
    CurrencyBrDirective,
    UpperCaseDirective
  ]
})
export class DirectivesModule {}
