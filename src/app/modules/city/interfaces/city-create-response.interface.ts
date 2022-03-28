import { ApiCreateUpdateAt } from '../../../shared/interfaces/api-create-update-at.interface';

export interface CityCreateResponse extends ApiCreateUpdateAt {
  readonly id: string;
  readonly nome: string;
  readonly estadoId: string;
}
