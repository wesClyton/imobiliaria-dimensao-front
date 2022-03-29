import { NgModule } from '@angular/core';
import { CharacteristicTypePipe } from './type/characteristic-type.pipe';

@NgModule({
  declarations: [CharacteristicTypePipe],
  exports: [CharacteristicTypePipe]
})
export class CharacteristicPipesModule {}
