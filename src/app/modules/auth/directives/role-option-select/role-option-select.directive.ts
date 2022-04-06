import { Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { Role } from '../../interfaces/role.interface';
import { RolePipe } from '../../pipes/role/role.pipe';
import { RoleLabel } from '../../utils/role-label.util';

@Directive({
  selector: '[appRoleOptionSelect]',
  providers: [RolePipe]
})
export class RoleOptionSelectDirective implements OnInit {

  @Output()
  public dataFinded = new EventEmitter<Array<Role>>();

  constructor(
    private readonly rolePipe: RolePipe
  ) { }

  ngOnInit(): void {
    const roles = new Array<Role>()
    Object.keys(RoleLabel.getAll()).forEach(key => {
      roles.push({
        name: this.rolePipe.transform(key as never),
        value: key
      });
    })
    this.dataFinded.emit(roles);
  }

}

