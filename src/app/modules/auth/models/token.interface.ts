import { RoleEnum } from '../enums/role.enum';

export interface Token {
  readonly usuario: {
    readonly id: string;
    readonly nome: string;
    readonly nivel: RoleEnum;
    readonly email: string;
  },
  readonly value: string;
}
