import { Pipe, PipeTransform } from '@angular/core';
import { CharacteristicType } from '../../enums/characteristic-type.enum';
import { CharacteristicTypeLabel } from '../../utils/characteristic-label.util';

@Pipe({
  name: 'characteristicType'
})
export class CharacteristicTypePipe implements PipeTransform {

  transform(characteristicType: CharacteristicType): string {
    return CharacteristicTypeLabel.getByType(characteristicType);
  }

}
