import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { UploadImageComponent } from '../../../../shared/components/upload-image/upload-image.component';
import { phoneValidator } from '../../../../shared/form-validators/phone.validator';
import { FormService } from '../../../../shared/services/form/form.service';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { BrokerCreateResponse } from '../../interfaces/broker-create-response.interface';
import { BrokerCreate } from '../../interfaces/broker-create.interface';
import { BrokerUploadService } from '../../services/broker-upload.service';
import { BrokerService } from '../../services/broker.service';

@Component({
  selector: 'app-broker-form-new',
  templateUrl: './broker-form-new.component.html'
})
export class BrokerFormNewComponent implements OnInit {

  public form!: UntypedFormGroup;

  private get controlNome(): AbstractControl | null {
    return this.form?.get('nome');
  }

  public get controlNomeHasError(): boolean | undefined {
    return this.controlNome?.dirty || this.controlNome?.hasError('required');
  }

  private get controlFuncao(): AbstractControl | null {
    return this.form?.get('funcao');
  }

  private get controlTelefone(): AbstractControl | null {
    return this.form?.get('telefone');
  }

  public get controlTelefoneHasError(): boolean | undefined {
    return this.controlTelefone?.dirty || this.controlTelefone?.hasError('required') || this.controlTelefone?.hasError('phoneInvalid');
  }

  private get controlWhatsApp(): AbstractControl | null {
    return this.form?.get('whatsapp');
  }

  public get controlWhatsAppHasError(): boolean | undefined {
    return this.controlWhatsApp?.hasError('phoneInvalid');
  }

  private get controlEmail(): AbstractControl | null {
    return this.form?.get('email');
  }

  public get controlEmailHasError(): boolean | undefined {
    return this.controlEmail?.dirty || this.controlEmail?.hasError('required') || this.controlEmail?.hasError('email');
  }

  private get controlBiografia(): AbstractControl | null {
    return this.form?.get('biografia');
  }

  private get controlCreci(): AbstractControl | null {
    return this.form?.get('creci');
  }

  private get controlInstagram(): AbstractControl | null {
    return this.form?.get('instagram');
  }

  private get controlFacebook(): AbstractControl | null {
    return this.form?.get('facebook');
  }

  private get controlLinkedin(): AbstractControl | null {
    return this.form?.get('linkedin');
  }

  private get controlPassword(): AbstractControl | null {
    return this.form?.get('password');
  }

  public get controlPasswordHasError(): boolean | undefined {
    return this.controlPassword?.dirty || this.controlPassword?.hasError('required');
  }

  @ViewChild(UploadImageComponent, { static: false })
  private readonly updaloadPhotoComponent!: UploadImageComponent;

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly notificationService: NotificationService,
    private readonly loadinService: LoadingService,
    private readonly brokerService: BrokerService,
    private readonly brokerUploadService: BrokerUploadService,
    private readonly router: Router,
    private readonly formService: FormService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      nome: new UntypedFormControl(null, [Validators.required]),
      email: new UntypedFormControl(null, [Validators.required, Validators.email]),
      telefone: new UntypedFormControl(null, [Validators.required, phoneValidator()]),
      whatsapp: new UntypedFormControl(null, [phoneValidator()]),
      biografia: new UntypedFormControl(null),
      creci: new UntypedFormControl(null),
      funcao: new UntypedFormControl(null),
      instagram: new UntypedFormControl(null),
      facebook: new UntypedFormControl(null),
      linkedin: new UntypedFormControl(null),
      password: new UntypedFormControl(null, [Validators.required])
    });
  }

  public submit(): void {
    if (this.form.invalid) {
      this.formService.validate(this.form);
      return;
    }

    this.loadinService.show();

    const brokerCreate: BrokerCreate = {
      biografia: this.controlBiografia?.value,
      creci: this.controlCreci?.value,
      email: this.controlEmail?.value,
      facebook: this.controlFacebook?.value,
      funcao: this.controlFuncao?.value,
      instagram: this.controlInstagram?.value,
      linkedin: this.controlLinkedin?.value,
      nome: this.controlNome?.value,
      password: this.controlPassword?.value,
      telefone: this.controlTelefone?.value,
      whatsapp: this.controlWhatsApp?.value
    }

    const fileUpload: File = this.updaloadPhotoComponent.filesSelecteds[0];
    const formData = new FormData();
    formData.append('foto', fileUpload);

    this.brokerService
      .post(brokerCreate)
      .pipe(take(1))
      .subscribe(broker => {
        if (fileUpload) {
          this.uploadPhoto(formData, broker);
          return;
        }
        this.messageSuccess(broker);
      },
      () => this.loadinService.hide());
  }

  private uploadPhoto(formData: FormData, brokerCreateResponse: BrokerCreateResponse): void {
    this.brokerUploadService
      .update(brokerCreateResponse.id, formData)
      .pipe(take(1))
      .subscribe(() => this.messageSuccess(brokerCreateResponse));
  }

  private messageSuccess(broker: BrokerCreateResponse): void {
    this.form.markAsPristine();
    this.loadinService.hide()
    this.notificationService.success(`Corretor ${broker.nome} cadastrado com sucesso!`);
    this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
  }

}
