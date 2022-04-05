import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { FormService } from '../../../../shared/services/form/form.service';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { CharacteristicType } from '../../../characteristic/enums/characteristic-type.enum';
import { Characteristic } from '../../../characteristic/interfaces/characteristic.interface';
import { CharacteristicService } from '../../../characteristic/services/characteristic.service';
import { CityGetAll } from '../../../city/interfaces/city-get-all.interface';
import { AnnouncementCreate } from '../../interfaces/announcement-create.interface';
import { AnnouncementStateProperty } from '../../interfaces/announcement-state-property.interface';
import { AnnouncementType } from '../../interfaces/announcement-type.interface';
import { AnnouncementService } from '../../services/announcement.service';

@Component({
  selector: 'app-announcement-form-new',
  templateUrl: './announcement-form-new.component.html'
})
export class AnnouncementFormNewComponent implements OnInit, OnDestroy {

  public form!: FormGroup;

  @ViewChild('inputCaracteristicaImovel', { static: false })
  private inputCaracteristicaImovel!: ElementRef<HTMLInputElement>;

  private get controlCaracteristicasImovel(): AbstractControl | null {
    return this.form?.get('caracteristicasImovel');
  }

  public characteristicsImovelSelected = new Array<Characteristic>();

  public characteristicsImovelFiltered!: Array<Characteristic>;

  public characteristicsInstalacoesCondominio = Array<Characteristic>();

  public announcementTypes!: Array<AnnouncementType>;

  public announcementStateProperties!: Array<AnnouncementStateProperty>;

  public cities!: CityGetAll;

  public imagesUrl = new Array<string>();

  private subscription = new Subscription();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly notificationService: NotificationService,
    private readonly loadinService: LoadingService,
    private readonly announcementService: AnnouncementService,
    private readonly router: Router,
    private readonly formService: FormService,
    private readonly characteristicService: CharacteristicService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      cidadeId: new FormControl(null),
      codigoAnuncio: new FormControl(null),
      destaque: new FormControl(false),
      titulo: new FormControl(null),
      tipo: new FormControl(null),
      expiracaoAnuncio: new FormControl(null),
      valor: new FormControl(null),
      valorCondominio: new FormControl(null),
      areaTotal: new FormControl(null),
      areaConstruida: new FormControl(null),
      sobre: new FormControl(null),
      dormitorios: new FormControl(null),
      suites: new FormControl(null),
      banheiros: new FormControl(null),
      vagasGaragem: new FormControl(null),
      empreendimento: new FormControl(null),
      cep: new FormControl(null),
      endereco: new FormControl(null),
      bairro: new FormControl(null),
      longitude: new FormControl(null),
      latitude: new FormControl(null),
      urlMapa: new FormControl(null),
      urlVideo: new FormControl(null),
      url360: new FormControl(null),
      estadoImovel: new FormControl(null),
      dataConclusao: new FormControl(null),
      caracteristicasImovel: new FormControl(null),
      caracteristicasInstalacoesCondominio: new FormControl(null)
    });

    this.subscription.add(
      this.controlCaracteristicasImovel?.valueChanges.subscribe(value => {
        value ? this.filterCharacteristicsImovel(value) : new Array<Characteristic>()
      })
    );
  }

  private filterCharacteristicsImovel(value: string): void {
    this.characteristicService.getAllRemoveQueryFilter();

    if (typeof value === 'string') {
      this.characteristicService.getAllAddQueryFilter({
        field: 'nome',
        value: value
      });
      this.characteristicService.getAllAddQueryFilter({
        field: 'tipo',
        value: CharacteristicType.InstalacoesCondominio
      });
    }

    this.characteristicService
      .getAll()
      .pipe(take(1))
      .subscribe(characteristics => this.characteristicsImovelFiltered = characteristics.data);
  }

  public addCharacteristicImovel(event: MatChipInputEvent): void {
    event.chipInput?.clear();
    this.resetControlCaracteristicaImovel();
  }

  public characteristicImovelSelected(event: MatAutocompleteSelectedEvent): void {
    this.resetControlCaracteristicaImovel();
    if (this.characteristicsImovelSelected.some(value => value.id === event.option.value.id)) {
      this.notificationService.information('Característica já informada.');
      return;
    }
    this.characteristicsImovelSelected.push(event.option.value);
  }

  private resetControlCaracteristicaImovel(): void {
    this.inputCaracteristicaImovel.nativeElement.value = '';
    this.controlCaracteristicasImovel?.setValue(null);
  }

  public removeCharacteristic(characteristic: Characteristic): void {
    const index = this.characteristicsImovelSelected.indexOf(characteristic);
    if (index >= 0) {
      this.characteristicsImovelSelected.splice(index, 1);
    }
  }

  public submit(): void {
    if (this.form.invalid) {
      this.formService.validade(this.form);
      return;
    }

    this.loadinService.show();

    const announcement: AnnouncementCreate = {} as AnnouncementCreate;

    this.announcementService
      .post(announcement)
      .pipe(
        take(1),
        finalize(() => this.loadinService.hide())
      )
      .subscribe((announcement) => {
        this.form.markAsPristine();
        this.loadinService.hide()
        this.notificationService.success(`Anúncio ${announcement.titulo} cadastrado com sucesso!`);
        this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
      });
  }

}
