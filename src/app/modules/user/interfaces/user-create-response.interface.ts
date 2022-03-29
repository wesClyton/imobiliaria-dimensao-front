import { ApiCreateUpdateAt } from '../../../shared/interfaces/api-create-update-at.interface';
import { Role } from '../../auth/enums/role.enum';

export interface UserCreateResponse extends ApiCreateUpdateAt {
  readonly id: string;
  readonly nome: string;
  readonly email: string;
  readonly nivel: Role;
  readonly password: string;
  readonly ativo: boolean;
}
