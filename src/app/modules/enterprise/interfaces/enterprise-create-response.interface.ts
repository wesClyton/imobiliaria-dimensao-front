import { ApiCreateUpdateAt } from '../../../shared/interfaces/api-create-update-at.interface';
import { City } from '../../city/interfaces/city.interface';

export interface EnterpriseCreateResponse extends ApiCreateUpdateAt {
  readonly id: string;
  readonly nome: string;
  readonly cidadeId: string;
  readonly descricao: string;
  readonly link: string;
  readonly foto: string;
  readonly ativo: boolean;
}
