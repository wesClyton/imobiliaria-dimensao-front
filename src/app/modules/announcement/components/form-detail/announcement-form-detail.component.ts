import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { AngularMaterialDialogConfirmationService } from '../../../../shared/angular-material/dialog-confirmation/angular-material-dialog-confirmation.service';
import { UploadImageComponent } from '../../../../shared/components/upload-image/upload-image.component';
import { PathImagePipe } from '../../../../shared/pipes/path-image/path-image.pipe';
import { FormService } from '../../../../shared/services/form/form.service';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { CharacteristicType } from '../../../characteristic/enums/characteristic-type.enum';
import { Characteristic } from '../../../characteristic/interfaces/characteristic.interface';
import { CharacteristicService } from '../../../characteristic/services/characteristic.service';
import { CityGetAll } from '../../../city/interfaces/city-get-all.interface';
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
export class AnnouncementFormDetailComponent implements OnInit {

  @Input()
  public announcement!: Announcement;

  public form!: FormGroup;

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

  public get controlDataConclusaoHasError(): boolean | undefined {
    return this.controlDataConclusao?.dirty || this.controlDataConclusao?.hasError('required');
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

  private get controlCidade(): AbstractControl | null {
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
    return this.form?.get('bairro');
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

  private get controlDestaque(): AbstractControl | null {
    return this.form?.get('destaque');
  }

  private get controlEmpreendimento(): AbstractControl | null {
    return this.form?.get('empreendimento');
  }

  private get controlLatitude(): AbstractControl | null {
    return this.form?.get('latitude');
  }

  private get controlLongitude(): AbstractControl | null {
    return this.form?.get('longitude');
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

  private get controlAtivo(): AbstractControl | null {
    return this.form?.get('ativo');
  }

  @ViewChild('inputCaracteristicaImovel', { static: false })
  private inputCaracteristicaImovel!: ElementRef<HTMLInputElement>;

  @ViewChild('inputCaracteristicaInstalacoesCondominio', { static: false })
  private inputCaracteristicaInstalacoesCondominio!: ElementRef<HTMLInputElement>;

  @ViewChild(UploadImageComponent, { static: false })
  private updaloadPhotoComponent!: UploadImageComponent;

  public characteristicsImovelSelected = new Array<Characteristic>();

  public characteristicsImovelFiltered!: Array<Characteristic>;

  public characteristicsInstalacoesCondominioSelected = Array<Characteristic>();

  public characteristicsInstalacoesCondominioFiltered!: Array<Characteristic>;

  public announcementTypes!: Array<AnnouncementType>;

  public announcementStateProperties!: Array<AnnouncementStateProperty>;

  public cities!: CityGetAll;

  public imagesUrl = new Array<string>();

  private subscription = new Subscription();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly notificationService: NotificationService,
    private readonly loadingService: LoadingService,
    private readonly announcementService: AnnouncementService,
    private readonly router: Router,
    private readonly formService: FormService,
    private readonly characteristicService: CharacteristicService,
    private readonly announcementUploadService: AnnouncementUploadService,
    private readonly pathImagePipe: PathImagePipe,
    private readonly announcementImageDeleteService: AnnouncementImageDeleteService,
    private readonly angularMaterialDialogConfirmationService: AngularMaterialDialogConfirmationService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      ativo: new FormControl(false),
      cidadeId: new FormControl(null, [Validators.required]),
      codigoAnuncio: new FormControl(null, [Validators.required]),
      destaque: new FormControl(false),
      titulo: new FormControl(null, [Validators.required]),
      tipo: new FormControl(null, [Validators.required]),
      expiracaoAnuncio: new FormControl(null, [Validators.required]),
      valor: new FormControl(null, [Validators.required]),
      valorCondominio: new FormControl(null),
      areaTotal: new FormControl(null),
      areaConstruida: new FormControl(null),
      sobre: new FormControl(null),
      dormitorios: new FormControl(null, [Validators.required]),
      suites: new FormControl(null),
      banheiros: new FormControl(null, [Validators.required]),
      vagasGaragem: new FormControl(null),
      empreendimento: new FormControl(null),
      cep: new FormControl(null, [Validators.required]),
      endereco: new FormControl(null, [Validators.required]),
      bairro: new FormControl(null, [Validators.required]),
      longitude: new FormControl(null),
      latitude: new FormControl(null),
      urlMapa: new FormControl(null),
      urlVideo: new FormControl(null),
      url360: new FormControl(null),
      estadoImovel: new FormControl(null, [Validators.required]),
      dataConclusao: new FormControl(null, [Validators.required]),
      caracteristicasImovel: new FormControl(null),
      caracteristicasInstalacoesCondominio: new FormControl(null)
    });

    this.subscription.add(this.controlCaracteristicasImovel?.valueChanges.subscribe(value => this.filterCharacteristicsImovel(value)));

    this.subscription.add(
      this.controlCaracteristicasInstalacoesCondominio?.valueChanges.subscribe(value => this.filterCharacteristicsInstalacoesCondominio(value))
    );

    if (this.announcement) {
      this.setValueForm(this.announcement);
    }
  }

  private setValueForm(announcement: Announcement): void {
    this.form.patchValue(announcement);
    this.imagesUrl = new Array<string>();
    this.announcement.galeria.fotos.forEach(foto => this.imagesUrl.push(this.pathImagePipe.transform(foto.nome, 'anuncios', announcement.galeria.id)));

    this.characteristicsImovelSelected = announcement.caracteristicas.filter(characteristic => characteristic.tipo === CharacteristicType.Imovel);
    this.characteristicsInstalacoesCondominioSelected = announcement.caracteristicas.filter(characteristic => characteristic.tipo === CharacteristicType.InstalacoesCondominio);
  }

  private filterCharacteristicsImovel(value: string): void {
    this.characteristicService.getAllRemoveQueryFilter();

    if (typeof value === 'string') {
      this.characteristicService.getAllAddQueryFilter({
        field: 'nome',
        value: value
      });
    }
    this.characteristicService.getAllAddQueryFilter({
      field: 'tipo',
      value: CharacteristicType.Imovel
    });

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

  public removeCharacteristicImovel(characteristic: Characteristic): void {
    const index = this.characteristicsImovelSelected.indexOf(characteristic);
    if (index >= 0) {
      this.characteristicsImovelSelected.splice(index, 1);
    }
  }

  private filterCharacteristicsInstalacoesCondominio(value: string): void {
    this.characteristicService.getAllRemoveQueryFilter();

    if (typeof value === 'string') {
      this.characteristicService.getAllAddQueryFilter({
        field: 'nome',
        value: value
      });
    }
    this.characteristicService.getAllAddQueryFilter({
      field: 'tipo',
      value: CharacteristicType.InstalacoesCondominio
    });

    this.characteristicService
      .getAll()
      .pipe(take(1))
      .subscribe(characteristics => this.characteristicsInstalacoesCondominioFiltered = characteristics.data);
  }

  public addCharacteristicInstalacoesCondominio(event: MatChipInputEvent): void {
    event.chipInput?.clear();
    this.resetControlCaracteristicaInstalacoesCondominio();
  }

  public characteristicInstalacoesCondominioSelected(event: MatAutocompleteSelectedEvent): void {
    this.resetControlCaracteristicaInstalacoesCondominio();
    if (this.characteristicsInstalacoesCondominioSelected.some(value => value.id === event.option.value.id)) {
      this.notificationService.information('Característica já informada.');
      return;
    }
    this.characteristicsInstalacoesCondominioSelected.push(event.option.value);
  }

  private resetControlCaracteristicaInstalacoesCondominio(): void {
    this.inputCaracteristicaInstalacoesCondominio.nativeElement.value = '';
    this.controlCaracteristicasInstalacoesCondominio?.setValue(null);
  }

  public removeCharacteristicInstalacoesCondominio(characteristic: Characteristic): void {
    const index = this.characteristicsInstalacoesCondominioSelected.indexOf(characteristic);
    if (index >= 0) {
      this.characteristicsInstalacoesCondominioSelected.splice(index, 1);
    }
  }

  public submit(): void {
    if (this.form.invalid) {
      this.formService.validade(this.form);
      return;
    }

    this.loadingService.show();

    const caracteristicas = new Array<{ id: string }>();
    this.characteristicsImovelSelected.forEach(characteristic => caracteristicas.push({ id: characteristic.id }));
    this.characteristicsInstalacoesCondominioSelected.forEach(characteristic => caracteristicas.push({ id: characteristic.id }));

    const announcement: AnnouncementUpdate = {
      id: this.announcement.id,
      ativo: this.controlAtivo?.value,
      areaConstruida: this.controlAreaConstruida?.value,
      areaTotal: this.controlAreaTotal?.value,
      bairro: this.controlBairro?.value,
      banheiros: this.controlBanheiros?.value,
      caracteristicas,
      cep: this.controlCep?.value,
      cidadeId: this.controlCidade?.value,
      codigoAnuncio: this.controlCodigoAnuncio?.value,
      dataConclusao: this.controlDataConclusao?.value,
      destaque: this.controlDestaque?.value,
      dormitorios: this.controlDormitorios?.value,
      empreendimento: this.controlEmpreendimento?.value,
      endereco: this.controlEndereco?.value,
      estadoImovel: this.controlEstadoImovel?.value,
      expiracaoAnuncio: this.controlDataExpiracao?.value,
      latitude: this.controlLatitude?.value,
      longitude: this.controlLongitude?.value,
      sobre: this.controlSobre?.value,
      suites: this.controlSuites?.value,
      tipo: this.controlTipo?.value,
      titulo: this.controlTitulo?.value,
      url360: this.controlUrl360?.value,
      urlMapa: this.controlUrlMapa?.value,
      urlVideo: this.controlUrlVideo?.value,
      vagasGaragem: this.controlVagasGaragem?.value,
      valor: this.controlValor?.value,
      valorCondominio: this.controlValorCondominio?.value
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
