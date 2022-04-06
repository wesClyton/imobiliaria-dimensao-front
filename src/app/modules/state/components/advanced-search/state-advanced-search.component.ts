import { Component } from '@angular/core';
import { AdvancedSearchBaseComponent } from '../../../../shared/components/advanced-search-base/advanced-search-base.component';
import { StateBr } from '../../../../shared/components/state-br/state-br.interface';

@Component({
  selector: 'app-state-advanced-search',
  templateUrl: 'state-advanced-search.component.html'
})
export class StateAdvancedSearchComponent extends AdvancedSearchBaseComponent {

  public states!: Array<StateBr>;

  constructor() {
    super();
    super.fields = ['nome', 'uf'];
  }

}
