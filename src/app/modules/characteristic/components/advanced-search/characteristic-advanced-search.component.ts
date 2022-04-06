import { Component } from '@angular/core';
import { AdvancedSearchComponent } from '../../../../shared/components/advanced-search/advanced-search.component';

@Component({
  selector: 'app-characteristic-advanced-search',
  templateUrl: 'characteristic-advanced-search.component.html'
})
export class CharacteristicAdvancedSearchComponent extends AdvancedSearchComponent {

  public fields = ['nome'];

  constructor() {
    super();
    super.createForm();
  }

}
