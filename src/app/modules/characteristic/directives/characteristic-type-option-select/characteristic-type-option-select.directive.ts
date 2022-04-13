import { Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { CharacteristicType as CharacteristicTypeEnum } from '../../enums/characteristic-type.enum';
import { CharacteristicType } from '../../interfaces/characteristic-type.interface';
import { CharacteristicTypePipe } from '../../pipes/type/characteristic-type.pipe';
import { CharacteristicTypeLabel } from '../../utils/characteristic-label.util';

@Directive({
  selector: '[appCharacteristicTypeOptionSelect]',
  providers: [CharacteristicTypePipe]
})
export class CharacteristicTypeOptionSelectDirective implements OnInit {

  @Output()
  public readonly dataFinded = new EventEmitter<Array<CharacteristicType>>();

  constructor(
    private readonly characteristicTypePipe: CharacteristicTypePipe
  ) { }

  ngOnInit(): void {
    const characteristicTypes = new Array<CharacteristicType>();
    Object.keys(CharacteristicTypeLabel.getAll()).forEach(key => {
      characteristicTypes.push({
        name: this.characteristicTypePipe.transform(key as never),
        value: key as CharacteristicTypeEnum
      });
    })
    this.dataFinded.emit(characteristicTypes);
  }

}

