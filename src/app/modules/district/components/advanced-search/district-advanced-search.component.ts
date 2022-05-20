import { Component } from '@angular/core';
import { CityGetAll } from 'src/app/modules/city/interfaces/city-get-all.interface';
import { AdvancedSearchBaseComponent } from '../../../../shared/components/advanced-search-base/advanced-search-base.component';


@Component({
  selector: 'app-district-advanced-search',
  templateUrl: 'district-advanced-search.component.html'
})
export class DistrictAdvancedSearchComponent extends AdvancedSearchBaseComponent {

  public cities!: CityGetAll;

  constructor() {
    super();
    super.fields = ['nome', 'cidade'];
  }

}
