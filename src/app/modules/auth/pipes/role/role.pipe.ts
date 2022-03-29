import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '../../enums/role.enum';
import { RoleLabel } from '../../utils/role-label.util';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(role: Role): string {
    return RoleLabel.getByRole(role);
  }

}
