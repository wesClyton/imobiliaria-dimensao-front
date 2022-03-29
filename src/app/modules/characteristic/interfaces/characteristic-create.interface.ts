import { CharacteristicType } from '../enums/characteristic-type.enum';

export interface CharacteristicCreate {
  readonly nome: string;
  readonly tipo: CharacteristicType;
}
