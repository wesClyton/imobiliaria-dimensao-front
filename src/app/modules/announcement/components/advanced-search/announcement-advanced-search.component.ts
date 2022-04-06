import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { QueryFilter } from '../../../../shared/services/http/query-filter/query-filter';
import { QueryFilterParam } from '../../../../shared/services/http/query-filter/query-filter.interface';
import { CityGetAll } from '../../../city/interfaces/city-get-all.interface';
import { AnnouncementStateProperty } from '../../interfaces/announcement-state-property.interface';
import { AnnouncementType } from '../../interfaces/announcement-type.interface';

@Component({
  selector: 'app-announcement-advanced-search',
  templateUrl: 'announcement-advanced-search.component.html'
})
export class AnnouncementAdvancedSearchComponent implements OnInit {

  public form!: FormGroup;

  public announcementTypes!: Array<AnnouncementType>;

  public cities!: CityGetAll;

  public announcementStateProperties!: Array<AnnouncementStateProperty>;

  @Output()
  public queryFilterEmitter = new EventEmitter<Array<QueryFilterParam>>()

  constructor(
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      ativo: new FormControl(null),
      tipo: new FormControl(null),
      cidadeId: new FormControl(null),
      bairro: new FormControl(null),
      valorMinimo: new FormControl(null),
      valorMaximo: new FormControl(null),
      areaMinima: new FormControl(null),
      areaMaxima: new FormControl(null),
      banheiros: new FormControl(null),
      dormitorios: new FormControl(null),
      vagasGaragem: new FormControl(null),
      titulo: new FormControl(null),
      codigoAnuncio: new FormControl(null),
      destaque: new FormControl(null),
      expiracaoDe: new FormControl(null),
      expiracaoAte: new FormControl(null),
      empreendimento: new FormControl(null),
      estadoImovel: new FormControl(null)
    });
  }

  public submit(): void {
    this.queryFilterEmitter.emit(QueryFilter.createArrayFromKeyValue(this.form.value));
  }

}
