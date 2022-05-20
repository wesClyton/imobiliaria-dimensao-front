import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AdvancedSearchBaseComponent } from '../../../../shared/components/advanced-search-base/advanced-search-base.component';
import { CityGetAll } from '../../../city/interfaces/city-get-all.interface';
import { DistrictGetAll } from '../../../district/interfaces/district-get-all.interface';
import { DistrictService } from '../../../district/services/district.service';
import { AnnouncementStateProperty } from '../../interfaces/announcement-state-property.interface';
import { AnnouncementType } from '../../interfaces/announcement-type.interface';

@Component({
  selector: 'app-announcement-advanced-search',
  templateUrl: 'announcement-advanced-search.component.html'
})
export class AnnouncementAdvancedSearchComponent extends AdvancedSearchBaseComponent implements OnInit {

  public announcementTypes!: Array<AnnouncementType>;

  public cities!: CityGetAll;

  public districts!: DistrictGetAll;

  public announcementStateProperties!: Array<AnnouncementStateProperty>;

  private subscription = new Subscription();

  public get controlCidade(): AbstractControl | null {
    return this.form.get('cidadeId');
  }

  constructor(
    private readonly districtService: DistrictService
  ) {
    super();
    super.fields = [
      'ativo',
      'tipo',
      'cidadeId',
      'bairroId',
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

  ngOnInit(): void {
    super['createForm']();
    this.subscription.add(this.form.get('cidadeId')?.valueChanges.subscribe(value => this.getDistricts(value)));
  }


  private getDistricts(cityId: string): void {
    this.districtService.queryFilterRemove();
    this.districtService.queryFilterAdd({
      field: 'cidadeId',
      value: cityId
    });
    this.districtService
      .getAll()
      .pipe(take(1))
      .subscribe((districts) => this.districts = districts)
  }
}
