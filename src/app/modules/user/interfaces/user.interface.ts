import { Role } from '../../auth/enums/role.enum';

export interface User {
  id: string;
  nome: string;
  nivel: Role;
  email: string;
  ativo: boolean;
}
