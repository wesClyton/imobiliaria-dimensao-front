import { Role } from '../../auth/enums/role.enum';

export interface UserCreate {
  nome: string;
  email: string;
  nivel: Role;
  password: string;
}
