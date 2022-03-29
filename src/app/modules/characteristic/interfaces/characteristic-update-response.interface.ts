import { CharacteristicType } from '../enums/characteristic-type.enum';

export interface CharacteristicUpdateResponse {
  readonly id: string;
  readonly nome: string;
  readonly tipo: CharacteristicType;
}
