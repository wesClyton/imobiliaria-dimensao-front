import { Role } from '../../auth/enums/role.enum';

export interface UserUpdateResponse {
  readonly id: string;
  readonly nome: string;
  readonly email: string;
  readonly nivel: Role;
  readonly password: string;
}
