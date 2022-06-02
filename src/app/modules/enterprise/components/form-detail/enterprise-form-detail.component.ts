import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CityGetAll } from 'src/app/modules/city/interfaces/city-get-all.interface';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { UploadImageComponent } from '../../../../shared/components/upload-image/upload-image.component';
import { phoneValidator } from '../../../../shared/form-validators/phone.validator';
import { PathImagePipe } from '../../../../shared/pipes/path-image/path-image.pipe';
import { FormService } from '../../../../shared/services/form/form.service';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { AuthService } from '../../../auth/services/auth.service';
import { EnterpriseUpdateResponse } from '../../interfaces/enterprise-update-response.interface';
import { EnterpriseUpdate } from '../../interfaces/enterprise-update.interface';
import { Enterprise } from '../../interfaces/enterprise.interface';
import { EnterpriseUploadService } from '../../services/enterprise-upload.service';
import { EnterpriseService } from '../../services/enterprise.service';

@Component({
  selector: 'app-enterprise-form-detail',
  templateUrl: './enterprise-form-detail.component.html',
  providers: [PathImagePipe]
})
export class EnterpriseFormDetailComponent implements OnInit {

  public form!: FormGroup;
  public cities!: CityGetAll;

  private get controlNome(): AbstractControl | null {
    return this.form?.get('nome');
  }

  public get controlNomeHasError(): boolean | undefined {
    return this.controlNome?.dirty || this.controlNome?.hasError('required');
  }

  private get controlDescricao(): AbstractControl | null {
    return this.form?.get('descricao');
  }

  private get controlCidadeId(): AbstractControl | null {
    return this.form?.get('cidadeId');
  }

  public get controlCidadeIdHasError(): boolean | undefined {
    return this.controlCidadeId?.dirty || this.controlCidadeId?.hasError('required');
  }

  private get controlLink(): AbstractControl | null {
    return this.form?.get('link');
  }

  public get controlLinkHasError(): boolean | undefined {
    return this.controlLink?.dirty || this.controlLink?.hasError('required');
  }

  public get controlAtivo(): AbstractControl | null {
    return this.form?.get('ativo');
  }

  @Input()
  public enterprise!: Enterprise;

  public readonly imagesUrl = new Array<string>();

  @ViewChild(UploadImageComponent, { static: false })
  private readonly updaloadPhotoComponent!: UploadImageComponent;

  public get disableFields(): boolean {
    return this.authService.isLeitor || this.authService.isCorretor;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly notificationService: NotificationService,
    private readonly loadinService: LoadingService,
    private readonly enterpriseService: EnterpriseService,
    private readonly enterpriseUploadService: EnterpriseUploadService,
    private readonly router: Router,
    private readonly formService: FormService,
    private readonly pathImagePipe: PathImagePipe,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl(null, [Validators.required]),
      cidadeId: new FormControl(null, [Validators.required]),
      descricao: new FormControl(null),
      link: new FormControl(null, [Validators.required]),
      ativo: new FormControl(false)
    });

    if (this.enterprise) {
      this.setValueForm(this.enterprise);
    }
  }

  private setValueForm(enterprise: Enterprise): void {
    this.form.patchValue(enterprise);

    if (this.enterprise.foto) {
      this.imagesUrl.push(this.pathImagePipe.transform(this.enterprise.foto, 'empreendimentos'));
    }

    if (this.disableFields) {
      this.form.disable();
    }
  }

  public submit(): void {
    if (this.form.invalid) {
      this.formService.validate(this.form);
      return;
    }

    this.loadinService.show();

    const enterprise: EnterpriseUpdate = {
      id: this.enterprise.id,
      ativo: this.controlAtivo?.value,
      nome: this.controlNome?.value,
      descricao: this.controlDescricao?.value,
      cidadeId: this.controlCidadeId?.value,
      link: this.controlLink?.value
    }

    const fileUpload: File = this.updaloadPhotoComponent.filesSelecteds[0];
    const formData = new FormData();
    formData.append('foto', fileUpload);

    this.enterpriseService
      .put(enterprise)
      .pipe(take(1))
      .subscribe(enterprise => {
        if (fileUpload) {
          this.uploadPhoto(formData, enterprise);
          return;
        }
        this.messageSuccess(enterprise);
      },
        () => this.loadinService.hide());
  }

  private uploadPhoto(formData: FormData, enterpriseUpdateResponse: EnterpriseUpdateResponse): void {
    this.enterpriseUploadService
      .update(enterpriseUpdateResponse.id, formData)
      .pipe(take(1))
      .subscribe(() => {
        this.messageSuccess(enterpriseUpdateResponse)
      },
        () => this.loadinService.hide());
  }

  private messageSuccess(enterprise: EnterpriseUpdateResponse): void {
    this.form.markAsPristine();
    this.loadinService.hide();
    this.notificationService.success(`Corretor ${enterprise.nome} alterado com sucesso!`);
    this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
  }

}
