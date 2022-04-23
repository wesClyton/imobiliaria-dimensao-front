import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { ActiveInactivePipe } from './active-inactive/active-inactive.pipe';
import { CepPipe } from './cep/cep.pipe';
import { CityStatePipe } from './city-state/city-state.pipe';
import { CurrencyBrPipe } from './currency-br/currency-br.pipe';
import { M2Pipe } from './m2/m2.pipe';
import { PathImagePipe } from './path-image/path-image.pipe';
import { PhonePipe } from './phone/phone.pipe';
import { WhatsAppLinkPipe } from './whats-app-link/whats-app-link.pipe';
import { YesNoPipe } from './yes-no/yes-no.pipe';

@NgModule({
  declarations: [
    YesNoPipe,
    ActiveInactivePipe,
    PathImagePipe,
    CityStatePipe,
    WhatsAppLinkPipe,
    PhonePipe,
    CepPipe,
    M2Pipe,
    CurrencyBrPipe
  ],
  imports: [NgxMaskModule.forRoot()],
  exports: [
    YesNoPipe,
    ActiveInactivePipe,
    PathImagePipe,
    CityStatePipe,
    WhatsAppLinkPipe,
    PhonePipe,
    CepPipe,
    M2Pipe,
    CurrencyBrPipe
  ]
})
export class PipesModule {}
