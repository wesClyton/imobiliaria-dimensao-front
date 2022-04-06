import { Component } from '@angular/core';
import { AdvancedSearchBaseComponent } from '../../../../shared/components/advanced-search-base/advanced-search-base.component';
import { CityGetAll } from '../../../city/interfaces/city-get-all.interface';
import { AnnouncementStateProperty } from '../../interfaces/announcement-state-property.interface';
import { AnnouncementType } from '../../interfaces/announcement-type.interface';

@Component({
  selector: 'app-announcement-advanced-search',
  templateUrl: 'announcement-advanced-search.component.html'
})
export class AnnouncementAdvancedSearchComponent extends AdvancedSearchBaseComponent {

  public announcementTypes!: Array<AnnouncementType>;

  public cities!: CityGetAll;

  public announcementStateProperties!: Array<AnnouncementStateProperty>;

  constructor() {
    super();
    super.fields = [
      'ativo',
      'tipo',
      'cidadeId',
      'bairro',
      'valorMinimo',
      'valorMaximo',
      'areaMinima',
      'areaMaxima',
      'banheiros',
      'dormitorios',
      'vagasGaragem',
      'titulo',
      'codigoAnuncio',
      'destaque',
      'expiracaoDe',
      'expiracaoAte',
      'empreendimento',
      'estadoImovel'
    ]
  }

}
