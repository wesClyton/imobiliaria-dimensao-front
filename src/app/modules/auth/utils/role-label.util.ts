import { Role } from '../enums/role.enum';

export class RoleLabel {

  public static getAll(): { [key in Role]: string } {
    return {
      ADMIN: 'Administrador',
      AUTOR: 'Autor',
      CORRETOR: 'Corretor',
      LEITOR: 'Leitor'
    }
  }

  public static getByRole(role: Role): string {
    return RoleLabel.getAll()[role];
  }

}
