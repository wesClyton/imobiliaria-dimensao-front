import { Role } from '../../auth/enums/role.enum';

export interface UserUpdateResponse {
  id: string;
  nome: string;
  email: string;
  nivel: Role;
  password: string;
}
