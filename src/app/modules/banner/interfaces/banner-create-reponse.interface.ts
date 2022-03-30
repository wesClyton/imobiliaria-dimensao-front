import { ApiCreateUpdateAt } from '../../../shared/interfaces/api-create-update-at.interface';

export interface BannerCreateResponse extends ApiCreateUpdateAt {
  readonly id: string;
  readonly nome: string;
  readonly foto: string;
  readonly link: string;
  readonly ativo: boolean;
}
