import { Role } from '../../auth/enums/role.enum';

export interface UserCreate {
  readonly nome: string;
  readonly email: string;
  readonly nivel: Role;
  readonly password: string;
}
