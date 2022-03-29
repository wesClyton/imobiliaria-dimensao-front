import { NgModule } from '@angular/core';
import { ActiveInactivePipe } from './active-inactive/active-inactive.pipe';
import { YesNoPipe } from './yes-no/yes-no.pipe';

@NgModule({
  declarations: [
    YesNoPipe,
    ActiveInactivePipe
  ],
  exports: [
    YesNoPipe,
    ActiveInactivePipe
  ]
})
export class PipesModule {}
