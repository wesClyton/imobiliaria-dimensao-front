import { NgModule } from '@angular/core';
import { ActiveInactivePipe } from './active-inactive/active-inactive.pipe';
import { CityStatePipe } from './city-state/city-state.pipe';
import { PathImagePipe } from './path-image/path-image.pipe';
import { YesNoPipe } from './yes-no/yes-no.pipe';

@NgModule({
  declarations: [
    YesNoPipe,
    ActiveInactivePipe,
    PathImagePipe,
    CityStatePipe
  ],
  exports: [
    YesNoPipe,
    ActiveInactivePipe,
    PathImagePipe,
    CityStatePipe
  ]
})
export class PipesModule {}
