import { ApiCreateUpdateAt } from '../../../shared/interfaces/api-create-update-at.interface';

export interface StateCreateResponse extends ApiCreateUpdateAt {
  readonly id: string;
  readonly nome: string;
  readonly uf: string;
}
