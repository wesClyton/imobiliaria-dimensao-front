import { Role } from '../../auth/enums/role.enum';

export interface User {
  readonly id: string;
  readonly nome: string;
  readonly nivel: Role;
  readonly email: string;
  readonly ativo: boolean;
}
