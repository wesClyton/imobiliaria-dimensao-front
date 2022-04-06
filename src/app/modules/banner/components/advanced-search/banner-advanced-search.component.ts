import { Component } from '@angular/core';
import { AdvancedSearchBaseComponent } from '../../../../shared/components/advanced-search-base/advanced-search-base.component';

@Component({
  selector: 'app-banner-advanced-search',
  templateUrl: 'banner-advanced-search.component.html'
})
export class BannerAdvancedSearchComponent extends AdvancedSearchBaseComponent {

  constructor() {
    super();
    super.fields = ['ativo', 'nome'];
  }

}
