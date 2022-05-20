import { ApiCreateUpdateAt } from '../../../shared/interfaces/api-create-update-at.interface';

export interface DistrictCreateResponse extends ApiCreateUpdateAt {
  readonly id: string;
  readonly nome: string;
  readonly cidadeId: string;
}
