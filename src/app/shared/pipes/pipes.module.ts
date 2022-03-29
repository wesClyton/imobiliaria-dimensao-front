import { NgModule } from '@angular/core';
import { ActiveInactivePipe } from './active-inactive/active-inactive.pipe';
import { PathImagePipe } from './path-image/path-image.pipe';
import { YesNoPipe } from './yes-no/yes-no.pipe';

@NgModule({
  declarations: [
    YesNoPipe,
    ActiveInactivePipe,
    PathImagePipe
  ],
  exports: [
    YesNoPipe,
    ActiveInactivePipe,
    PathImagePipe
  ]
})
export class PipesModule {}
