import { Component } from '@angular/core';
import { AdvancedSearchBaseComponent } from '../../../../shared/components/advanced-search-base/advanced-search-base.component';
import { StateGetAll } from '../../../state/interfaces/state-get-all.interface';

@Component({
  selector: 'app-city-advanced-search',
  templateUrl: 'city-advanced-search.component.html'
})
export class CityAdvancedSearchComponent extends AdvancedSearchBaseComponent {

  public states!: StateGetAll;

  constructor() {
    super();
    super.fields = ['nome', 'uf'];
  }

}
