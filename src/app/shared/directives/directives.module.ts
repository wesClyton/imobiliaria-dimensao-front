import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { PhoneDirective } from './phone/phone.directive';

@NgModule({
  declarations: [PhoneDirective],
  imports: [NgxMaskModule.forRoot()],
  exports: [PhoneDirective]
})
export class DirectivesModule {}
