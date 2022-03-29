import { CharacteristicType } from '../enums/characteristic-type.enum';

export interface CharacteristicUpdate {
  readonly id: string;
  readonly nome: string;
  readonly tipo: CharacteristicType;
}
