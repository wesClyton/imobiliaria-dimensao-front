import { CharacteristicType as CharacteristicTypeEnum } from '../enums/characteristic-type.enum';

export interface CharacteristicType {
  readonly name: string;
  readonly value: CharacteristicTypeEnum;
}
