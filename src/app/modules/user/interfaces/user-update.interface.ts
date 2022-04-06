import { Role } from '../../auth/enums/role.enum';

export interface UserUpdate {
  readonly id: string;
  readonly nome: string;
  readonly email: string;
  readonly nivel: Role;
  readonly ativo: boolean;
  readonly password: string | null;
}
