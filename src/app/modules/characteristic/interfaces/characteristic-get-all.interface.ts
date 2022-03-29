import { ApiPagination } from '../../../shared/interfaces/api-pagination.interface';
import { Characteristic } from './characteristic.interface';

export interface CharacteristicGetAll extends ApiPagination {
  readonly data: Array<Characteristic>;
}
