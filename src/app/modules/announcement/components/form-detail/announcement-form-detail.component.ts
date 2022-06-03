import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { debounceTime, finalize, map, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { DialogConfirmationService } from '../../../../shared/components/dialog-confirmation/dialog-confirmation.service';
import { UploadImageComponent } from '../../../../shared/components/upload-image/upload-image.component';
import { PathImagePipe } from '../../../../shared/pipes/path-image/path-image.pipe';
import { FormService } from '../../../../shared/services/form/form.service';
import { StringUtil } from '../../../../shared/utils/string.util';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { AuthService } from '../../../auth/services/auth.service';
import { CharacteristicType } from '../../../characteristic/enums/characteristic-type.enum';
import { Characteristic } from '../../../characteristic/interfaces/characteristic.interface';
import { CharacteristicService } from '../../../characteristic/services/characteristic.service';
import { CityGetAll } from '../../../city/interfaces/city-get-all.interface';
import { DistrictGetAll } from '../../../district/interfaces/district-get-all.interface';
import { DistrictService } from '../../../district/services/district.service';
import { AnnouncementGalleryUploadResponse } from '../../interfaces/announcement-galery-upload.interface';
import { AnnouncementStateProperty } from '../../interfaces/announcement-state-property.interface';
import { AnnouncementType } from '../../interfaces/announcement-type.interface';
import { AnnouncementUpdateResponse } from '../../interfaces/announcement-update-response.interface';
import { AnnouncementUpdate } from '../../interfaces/announcement-update.interface';
import { Announcement } from '../../interfaces/announcement.interface';
import { AnnouncementUploadService } from '../../services/announcement-gallery-upload.service';
import { AnnouncementImageDeleteService } from '../../services/announcement-image-delete.service';
import { AnnouncementService } from '../../services/announcement.service';

@Component({
  selector: 'app-announcement-form-detail',
  templateUrl: './announcement-form-detail.component.html',
  providers: [PathImagePipe]
})
export class AnnouncementFormDetailComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input()
  public announcement!: Announcement;

  public form!: UntypedFormGroup;

  private get controlCodigoAnuncio(): AbstractControl | null {
    return this.form?.get('codigoAnuncio');
  }

  public get controlCodigoAnuncioHasError(): boolean | undefined {
    return this.controlCodigoAnuncio?.dirty || this.controlCodigoAnuncio?.hasError('required');
  }

  private get controlTitulo(): AbstractControl | null {
    return this.form?.get('titulo');
  }

  public get controlTituloHasError(): boolean | undefined {
    return this.controlTitulo?.dirty || this.controlTitulo?.hasError('required');
  }

  private get controlTipo(): AbstractControl | null {
    return this.form?.get('tipo');
  }

  public get controlTipoHasError(): boolean | undefined {
    return this.controlTipo?.dirty || this.controlTipo?.hasError('required');
  }

  private get controlValor(): AbstractControl | null {
    return this.form?.get('valor');
  }

  public get controlValorHasError(): boolean | undefined {
    return this.controlValor?.dirty || this.controlValor?.hasError('required');
  }

  private get controlDormitorios(): AbstractControl | null {
    return this.form?.get('dormitorios');
  }

  public get controlDormitoriosHasError(): boolean | undefined {
    return this.controlDormitorios?.dirty || this.controlDormitorios?.hasError('required');
  }

  private get controlBanheiros(): AbstractControl | null {
    return this.form?.get('banheiros');
  }

  public get controlBanheirosHasError(): boolean | undefined {
    return this.controlBanheiros?.dirty || this.controlBanheiros?.hasError('required');
  }

  private get controlEstadoImovel(): AbstractControl | null {
    return this.form?.get('estadoImovel');
  }

  public get controlEstadoImovelHasError(): boolean | undefined {
    return this.controlEstadoImovel?.dirty || this.controlEstadoImovel?.hasError('required');
  }

  private get controlDataConclusao(): AbstractControl | null {
    return this.form?.get('dataConclusao');
  }

  private get controlDataExpiracao(): AbstractControl | null {
    return this.form?.get('expiracaoAnuncio');
  }

  public get controlDataExpiracaoHasError(): boolean | undefined {
    return this.controlDataExpiracao?.dirty || this.controlDataExpiracao?.hasError('required');
  }

  private get controlCep(): AbstractControl | null {
    return this.form?.get('cep');
  }

  public get controlCepHasError(): boolean | undefined {
    return this.controlCep?.dirty || this.controlCep?.hasError('required');
  }

  public get controlCidade(): AbstractControl | null {
    return this.form?.get('cidadeId');
  }

  public get controlCidadeHasError(): boolean | undefined {
    return this.controlCidade?.dirty || this.controlCidade?.hasError('required');
  }

  private get controlEndereco(): AbstractControl | null {
    return this.form?.get('endereco');
  }

  public get controlEnderecoHasError(): boolean | undefined {
    return this.controlEndereco?.dirty || this.controlEndereco?.hasError('required');
  }

  private get controlBairro(): AbstractControl | null {
    return this.form?.get('bairroId');
  }

  public get controlBairroHasError(): boolean | undefined {
    return this.controlBairro?.dirty || this.controlBairro?.hasError('required');
  }

  private get controlCaracteristicasImovel(): AbstractControl | null {
    return this.form?.get('caracteristicasImovel');
  }

  private get controlCaracteristicasInstalacoesCondominio(): AbstractControl | null {
    return this.form?.get('caracteristicasInstalacoesCondominio');
  }

  private get controlAreaConstruida(): AbstractControl | null {
    return this.form?.get('areaConstruida');
  }

  private get controlAreaTotal(): AbstractControl | null {
    return this.form?.get('areaTotal');
  }

  public get controlDestaque(): AbstractControl | null {
    return this.form?.get('destaque');
  }

  private get controlEmpreendimento(): AbstractControl | null {
    return this.form?.get('empreendimento');
  }

  private get controlLatitude(): AbstractControl | null {
    return this.form?.get('latitude');
  }

  public get controlLatitudeHasError(): boolean | undefined {
    return this.controlLatitude?.dirty || this.controlLatitude?.hasError('required');
  }

  private get controlLongitude(): AbstractControl | null {
    return this.form?.get('longitude');
  }

  public get controlLongitudeHasError(): boolean | undefined {
    return this.controlLongitude?.dirty || this.controlLongitude?.hasError('required');
  }

  private get controlSobre(): AbstractControl | null {
    return this.form?.get('sobre');
  }

  private get controlSuites(): AbstractControl | null {
    return this.form?.get('suites');
  }

  private get controlUrl360(): AbstractControl | null {
    return this.form?.get('url360');
  }

  private get controlUrlMapa(): AbstractControl | null {
    return this.form?.get('urlMapa');
  }

  private get controlUrlVideo(): AbstractControl | null {
    return this.form?.get('urlVideo');
  }

  private get controlVagasGaragem(): AbstractControl | null {
    return this.form?.get('vagasGaragem');
  }

  private get controlValorCondominio(): AbstractControl | null {
    return this.form?.get('valorCondominio');
  }

  public get controlAtivo(): AbstractControl | null {
    return this.form?.get('ativo');
  }

  @ViewChild('inputCaracteristicaImovel', { static: false })
  private readonly inputCaracteristicaImovel!: ElementRef<HTMLInputElement>;

  @ViewChild('inputCaracteristicaInstalacoesCondominio', { static: false })
  private readonly inputCaracteristicaInstalacoesCondominio!: ElementRef<HTMLInputElement>;

  @ViewChild(UploadImageComponent, { static: false })
  private readonly updaloadPhotoComponent!: UploadImageComponent;

  public characteristicsImovel = new Array<Characteristic>();

  public characteristicsInstalacoesCondominio = Array<Characteristic>();

  public characteristicsFiltered!: Array<Characteristic>;

  private get characteristicSelectedTypes(): { [key in CharacteristicType]: Array<Characteristic> } {
    return {
      IMOVEL: this.characteristicsImovel,
      INSTALACOES_CONDOMINIO: this.characteristicsInstalacoesCondominio
    }
  }

  public announcementTypes!: Array<AnnouncementType>;

  public announcementStateProperties!: Array<AnnouncementStateProperty>;

  public cities!: CityGetAll;

  public imagesUrl = new Array<string>();

  private readonly subscription = new Subscription();

  public get disableFields(): boolean {
    return this.authService.isLeitor || this.authService.isCorretor;
  }

  public districts!: DistrictGetAll;

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly notificationService: NotificationService,
    private readonly loadingService: LoadingService,
    private readonly announcementService: AnnouncementService,
    private readonly router: Router,
    private readonly formService: FormService,
    private readonly characteristicService: CharacteristicService,
    private readonly announcementUploadService: AnnouncementUploadService,
    private readonly pathImagePipe: PathImagePipe,
    private readonly announcementImageDeleteService: AnnouncementImageDeleteService,
    private readonly angularMaterialDialogConfirmationService: DialogConfirmationService,
    private readonly authService: AuthService,
    private readonly districtService: DistrictService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  ngAfterViewInit(): void {
    (this.inputCaracteristicaImovel.nativeElement as HTMLInputElement).addEventListener('blur', () => {
      setTimeout(() => this.characteristicsFiltered = new Array<Characteristic>(), 100);
    });
    (this.inputCaracteristicaInstalacoesCondominio.nativeElement as HTMLInputElement).addEventListener('blur', () => {
      setTimeout(() => this.characteristicsFiltered = new Array<Characteristic>(), 100);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      ativo: new UntypedFormControl(false),
      cidadeId: new UntypedFormControl(null, [Validators.required]),
      codigoAnuncio: new UntypedFormControl(null, [Validators.required]),
      destaque: new UntypedFormControl(false),
      titulo: new UntypedFormControl(null, [Validators.required]),
      tipo: new UntypedFormControl(null, [Validators.required]),
      expiracaoAnuncio: new UntypedFormControl(null, [Validators.required]),
      valor: new UntypedFormControl(null, [Validators.required]),
      valorCondominio: new UntypedFormControl(null),
      areaTotal: new UntypedFormControl(null),
      areaConstruida: new UntypedFormControl(null),
      sobre: new UntypedFormControl(null),
      dormitorios: new UntypedFormControl(null, [Validators.required]),
      suites: new UntypedFormControl(null),
      banheiros: new UntypedFormControl(null, [Validators.required]),
      vagasGaragem: new UntypedFormControl(null),
      empreendimento: new UntypedFormControl(null),
      cep: new UntypedFormControl(null, [Validators.required]),
      endereco: new UntypedFormControl(null, [Validators.required]),
      bairroId: new UntypedFormControl(null, [Validators.required]),
      longitude: new UntypedFormControl(null, [Validators.required]),
      latitude: new UntypedFormControl(null, [Validators.required]),
      urlMapa: new UntypedFormControl(null),
      urlVideo: new UntypedFormControl(null),
      url360: new UntypedFormControl(null),
      estadoImovel: new UntypedFormControl(null, [Validators.required]),
      dataConclusao: new UntypedFormControl(null),
      caracteristicasImovel: new UntypedFormControl(null),
      caracteristicasInstalacoesCondominio: new UntypedFormControl(null)
    });

    this.subscription.add(
      this.controlCaracteristicasImovel?.valueChanges
        .pipe(debounceTime(500))
        .subscribe(value => this.filterCharacteristics(value, CharacteristicType.Imovel))
    );

    this.subscription.add(
      this.controlCaracteristicasInstalacoesCondominio?.valueChanges
        .pipe(debounceTime(500))
        .subscribe(value => this.filterCharacteristics(value, CharacteristicType.InstalacoesCondominio))
    );

    this.subscription.add(this.controlCidade?.valueChanges.subscribe(value => this.getDistricts(value)));

    if (this.announcement) {
      this.setValueForm(this.announcement);
    }
  }

  private getDistricts(cityId: string): void {
    this.districtService.queryFilterRemove();
    this.districtService.queryFilterAdd({
      field: 'cidadeId',
      value: cityId
    });
    this.districtService.queryFilterAdd({
      field: 'take',
      value: '100'
    });
    this.districtService
      .getAll()
      .pipe(take(1))
      .subscribe((districts) => this.districts = districts)
  }

  private setValueForm(announcement: Announcement): void {
    this.form.patchValue(announcement);
    this.controlCidade?.setValue(announcement.bairro.cidade.id);
    this.imagesUrl = new Array<string>();
    announcement.galeria.fotos.forEach(foto => this.imagesUrl.push(this.pathImagePipe.transform(foto.nome, 'anuncios', announcement.galeria.id)));

    this.characteristicsImovel = announcement.caracteristicas.filter(characteristic => characteristic.tipo === CharacteristicType.Imovel);
    this.characteristicsInstalacoesCondominio = announcement.caracteristicas.filter(characteristic => characteristic.tipo === CharacteristicType.InstalacoesCondominio);

    if (this.disableFields) {
      this.form.disable();
    }
  }

  private filterCharacteristics(value: string, type: CharacteristicType): void {
    if (value && typeof value === 'string') {
      this.characteristicService.queryFilterAdd({
        field: 'nome',
        value: value
      });
      this.characteristicService.queryFilterAdd({
        field: 'tipo',
        value: type
      });

      this.characteristicService
        .getAll()
        .pipe(take(1))
        .subscribe(characteristics => this.characteristicsFiltered = characteristics.data.filter(characteristic => characteristic.tipo === type));
    }
  }

  private resetControlsCaracteristica(): void {
    this.inputCaracteristicaImovel.nativeElement.value = '';
    this.controlCaracteristicasImovel?.setValue(null);

    this.inputCaracteristicaInstalacoesCondominio.nativeElement.value = '';
    this.controlCaracteristicasInstalacoesCondominio?.setValue(null);
  }

  public chipInputClear(event: MatChipInputEvent): void {
    this.characteristicService.queryFilterRemove();
    this.resetControlsCaracteristica();
    this.characteristicsFiltered = new Array<Characteristic>();
    event.chipInput?.clear();
  }

  public characteristicSelected(event: MatAutocompleteSelectedEvent): void {
    this.resetControlsCaracteristica();

    const characteristic: Characteristic = event.option.value;
    if (this.characteristicSelectedTypes[characteristic.tipo].some(value => value.id === characteristic.id)) {
      this.notificationService.information('Característica já informada.');
      return;
    }
    this.characteristicSelectedTypes[characteristic.tipo].push(characteristic);
    this.characteristicsFiltered = new Array<Characteristic>();
  }

  public removeCharacteristic(characteristic: Characteristic): void {
    const index = this.characteristicSelectedTypes[characteristic.tipo].indexOf(characteristic);
    if (index >= 0) {
      this.characteristicSelectedTypes[characteristic.tipo].splice(index, 1);
    }
  }

  public submit(): void {
    if (this.form.invalid) {
      this.formService.validate(this.form);
      return;
    }

    this.loadingService.show();

    const caracteristicas = new Array<{ id: string }>();
    this.characteristicsImovel.forEach(characteristic => caracteristicas.push({ id: characteristic.id }));
    this.characteristicsInstalacoesCondominio.forEach(characteristic => caracteristicas.push({ id: characteristic.id }));

    const announcement: AnnouncementUpdate = {
      id: this.announcement.id,
      ativo: this.controlAtivo?.value,
      areaConstruida: StringUtil.transformNumber(this.controlAreaConstruida?.value),
      areaTotal: StringUtil.transformNumber(this.controlAreaTotal?.value),
      bairroId: this.controlBairro?.value,
      banheiros: Number(this.controlBanheiros?.value),
      caracteristicas,
      cep: this.controlCep?.value,
      codigoAnuncio: this.controlCodigoAnuncio?.value,
      dataConclusao: this.controlDataConclusao?.value,
      destaque: this.controlDestaque?.value,
      dormitorios: Number(this.controlDormitorios?.value),
      empreendimento: this.controlEmpreendimento?.value,
      endereco: this.controlEndereco?.value,
      estadoImovel: this.controlEstadoImovel?.value,
      expiracaoAnuncio: this.controlDataExpiracao?.value,
      latitude: this.controlLatitude?.value,
      longitude: this.controlLongitude?.value,
      sobre: this.controlSobre?.value,
      suites: Number(this.controlSuites?.value),
      tipo: this.controlTipo?.value,
      titulo: this.controlTitulo?.value,
      url360: this.controlUrl360?.value,
      urlMapa: this.controlUrlMapa?.value,
      urlVideo: this.controlUrlVideo?.value,
      vagasGaragem: Number(this.controlVagasGaragem?.value),
      valor: StringUtil.transformNumber(this.controlValor?.value),
      valorCondominio: StringUtil.transformNumber(this.controlValorCondominio?.value)
    };

    this.announcementService
      .put(announcement)
      .pipe(
        take(1),
        map((announcement) => {
          let uploads = new Array<Observable<AnnouncementGalleryUploadResponse>>();
          this.updaloadPhotoComponent.filesSelecteds.forEach(file => {
            const formData = new FormData();
            formData.append('foto', file);
            formData.append('galeriaId', announcement.galeria.id);
            uploads.push(this.announcementUploadService.post(formData));
          });
          return { uploads, announcement };
        })
      )
      .subscribe(response => {
        if (!response.uploads.length) {
          this.messageSuccess(response.announcement);
          return;
        }
        this.loadingService.show();
        forkJoin(response.uploads).pipe(take(1)).subscribe(
          () => this.messageSuccess(response.announcement),
          () => this.loadingService.hide()
        );
      },
        (error) => this.loadingService.hide());
  }

  private messageSuccess(announcement: AnnouncementUpdateResponse): void {
    this.loadingService.hide();
    this.form.markAsPristine();
    this.notificationService.success(`Anúncio ${announcement.titulo} alterado com sucesso!`);
    this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
  }

  public async deleteImage(indexImage: number): Promise<void> {
    const photo = this.announcement.galeria.fotos[indexImage];

    const confirmation = await this.angularMaterialDialogConfirmationService?.confirm({
      message: 'Realmente deseja excluir a foto?'
    });
    if (!confirmation) {
      return;
    }

    this.loadingService.show()

    this.announcementImageDeleteService
      .delete(photo.id)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(() => this.getAnnouncement());
  }

  private getAnnouncement(): void {
    this.loadingService.show();
    this.announcementService
      .getById(this.announcement.id)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(announcement => {
        this.announcement = announcement;
        this.setValueForm(this.announcement);
      });
  }

}
