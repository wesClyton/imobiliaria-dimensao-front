import { ApiCreateUpdateAt } from '../../../shared/interfaces/api-create-update-at.interface';
import { CharacteristicType } from '../enums/characteristic-type.enum';

export interface CharacteristicCreateResponse extends ApiCreateUpdateAt {
  readonly id: string;
  readonly nome: string;
  readonly tipo: CharacteristicType;
}
