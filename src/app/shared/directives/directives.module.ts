import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { CepDirective } from './cep/cep.directive';
import { PhoneDirective } from './phone/phone.directive';

@NgModule({
  declarations: [
    PhoneDirective,
    CepDirective
  ],
  imports: [NgxMaskModule.forRoot()],
  exports: [
    PhoneDirective,
    CepDirective
  ]
})
export class DirectivesModule {}
