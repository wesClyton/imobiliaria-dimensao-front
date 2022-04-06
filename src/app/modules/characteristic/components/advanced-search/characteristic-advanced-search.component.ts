import { Component } from '@angular/core';
import { AdvancedSearchBaseComponent } from '../../../../shared/components/advanced-search-base/advanced-search-base.component';
import { CharacteristicType } from '../../interfaces/characteristic-type.interface';

@Component({
  selector: 'app-characteristic-advanced-search',
  templateUrl: 'characteristic-advanced-search.component.html'
})
export class CharacteristicAdvancedSearchComponent extends AdvancedSearchBaseComponent {

  public characteristicTypes!: Array<CharacteristicType>;

  constructor() {
    super();
    super.fields = ['nome', 'tipo'];
  }

}
