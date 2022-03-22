import { Role } from '../enums/role.enum';

export interface Session {
  readonly usuario: {
    readonly id: string;
    readonly nome: string;
    readonly nivel: Role;
    readonly email: string;
  },
  readonly token: string;
}
