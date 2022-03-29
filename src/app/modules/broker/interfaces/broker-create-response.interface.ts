import { ApiCreateUpdateAt } from '../../../shared/interfaces/api-create-update-at.interface';

export interface BrokerCreateResponse extends ApiCreateUpdateAt {
  readonly id: string;
  readonly nome: string;
  readonly funcao: string;
  readonly telefone: string;
  readonly whatsapp: string;
  readonly email: string;
  readonly foto: string;
  readonly usuarioId: string;
  readonly ativo: boolean;
}
