import { Component } from '@angular/core';
import { AdvancedSearchBaseComponent } from '../../../../shared/components/advanced-search-base/advanced-search-base.component';

@Component({
  selector: 'app-enterprise-advanced-search',
  templateUrl: 'enterprise-advanced-search.component.html'
})
export class EnterpriseAdvancedSearchComponent extends AdvancedSearchBaseComponent {

  constructor() {
    super();
    super.fields = ['ativo', 'nome'];
  }

}
