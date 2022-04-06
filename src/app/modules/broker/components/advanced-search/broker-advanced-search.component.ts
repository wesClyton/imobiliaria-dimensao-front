import { Component } from '@angular/core';
import { AdvancedSearchBaseComponent } from '../../../../shared/components/advanced-search-base/advanced-search-base.component';

@Component({
  selector: 'app-broker-advanced-search',
  templateUrl: 'broker-advanced-search.component.html'
})
export class BrokerAdvancedSearchComponent extends AdvancedSearchBaseComponent {

  constructor() {
    super();
    super.fields = ['ativo', 'nome', 'funcao', 'creci'];
  }

}
