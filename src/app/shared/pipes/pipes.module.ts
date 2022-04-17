import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { ActiveInactivePipe } from './active-inactive/active-inactive.pipe';
import { CityStatePipe } from './city-state/city-state.pipe';
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
    PhonePipe
  ],
  imports: [NgxMaskModule.forRoot()],
  exports: [
    YesNoPipe,
    ActiveInactivePipe,
    PathImagePipe,
    CityStatePipe,
    WhatsAppLinkPipe,
    PhonePipe
  ]
})
export class PipesModule {}
