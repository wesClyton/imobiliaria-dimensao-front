import { Component } from '@angular/core';
import { AdvancedSearchBaseComponent } from '../../../../shared/components/advanced-search-base/advanced-search-base.component';
import { Role } from '../../../auth/interfaces/role.interface';

@Component({
  selector: 'app-user-advanced-search',
  templateUrl: 'user-advanced-search.component.html'
})
export class UserAdvancedSearchComponent extends AdvancedSearchBaseComponent {

  public roles!: Array<Role>;

  constructor() {
    super();
    super.fields = ['ativo', 'nome', 'nivel', 'email'];
  }

}
