import { ApiCreateUpdateAt } from '../../../shared/interfaces/api-create-update-at.interface';
import { Role } from '../../auth/enums/role.enum';

export interface UserCreateResponse extends ApiCreateUpdateAt {
  id: string;
  nome: string;
  email: string;
  nivel: Role;
  password: string;
  ativo: boolean;
}
