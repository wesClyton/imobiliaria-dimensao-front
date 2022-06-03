import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CityGetAll } from 'src/app/modules/city/interfaces/city-get-all.interface';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { UploadImageComponent } from '../../../../shared/components/upload-image/upload-image.component';
import { phoneValidator } from '../../../../shared/form-validators/phone.validator';
import { FormService } from '../../../../shared/services/form/form.service';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { EnterpriseCreateResponse } from '../../interfaces/enterprise-create-response.interface';
import { EnterpriseCreate } from '../../interfaces/enterprise-create.interface';
import { EnterpriseUploadService } from '../../services/enterprise-upload.service';
import { EnterpriseService } from '../../services/enterprise.service';

@Component({
  selector: 'app-enterprise-form-new',
  templateUrl: './enterprise-form-new.component.html'
})
export class EnterpriseFormNewComponent implements OnInit {

  public form!: UntypedFormGroup;
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


  @ViewChild(UploadImageComponent, { static: false })
  private readonly updaloadPhotoComponent!: UploadImageComponent;

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly notificationService: NotificationService,
    private readonly loadinService: LoadingService,
    private readonly enterpriseService: EnterpriseService,
    private readonly enterpriseUploadService: EnterpriseUploadService,
    private readonly router: Router,
    private readonly formService: FormService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      nome: new UntypedFormControl(null, [Validators.required]),
      cidadeId: new UntypedFormControl(null, [Validators.required]),
      descricao: new UntypedFormControl(null),
      link: new UntypedFormControl(null, [Validators.required])
    });
  }

  public submit(): void {
    if (this.form.invalid) {
      this.formService.validate(this.form);
      return;
    }

    this.loadinService.show();

    const enterpriseCreate: EnterpriseCreate = {
      nome: this.controlNome?.value,
      descricao: this.controlDescricao?.value,
      cidadeId: this.controlCidadeId?.value,
      link: this.controlLink?.value,
    }

    const fileUpload: File = this.updaloadPhotoComponent.filesSelecteds[0];
    const formData = new FormData();
    formData.append('foto', fileUpload);

    this.enterpriseService
      .post(enterpriseCreate)
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

  private uploadPhoto(formData: FormData, enterpriseCreateResponse: EnterpriseCreateResponse): void {
    this.enterpriseUploadService
      .update(enterpriseCreateResponse.id, formData)
      .pipe(take(1))
      .subscribe(() => this.messageSuccess(enterpriseCreateResponse));
  }

  private messageSuccess(enterprise: EnterpriseCreateResponse): void {
    this.form.markAsPristine();
    this.loadinService.hide()
    this.notificationService.success(`Corretor ${enterprise.nome} cadastrado com sucesso!`);
    this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
  }

}
