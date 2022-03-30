import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { UpdaloadPhotoComponent } from '../../../../shared/components/upload-photo/upload-photo.component';
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

  public form!: FormGroup;

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
    return this.controlTelefone?.dirty || this.controlTelefone?.hasError('required');
  }

  private get controlWhatsApp(): AbstractControl | null {
    return this.form?.get('whatsapp');
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

  @ViewChild(UpdaloadPhotoComponent, { static: false })
  private updaloadPhotoComponent!: UpdaloadPhotoComponent;

  constructor(
    private readonly formBuilder: FormBuilder,
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
      nome: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      telefone: new FormControl(null, [Validators.required]),
      whatsapp: new FormControl(null),
      biografia: new FormControl(null),
      creci: new FormControl(null),
      funcao: new FormControl(null),
      instagram: new FormControl(null),
      facebook: new FormControl(null),
      linkedin: new FormControl(null),
      password: new FormControl(null, [Validators.required])
    });
  }

  public submit(): void {
    if (this.form.invalid) {
      this.formService.validade(this.form);
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
      .pipe(
        take(1),
        finalize(() => this.loadinService.hide())
      )
      .subscribe(broker => {
        if (fileUpload) {
          this.uploadPhoto(formData, broker);
          return;
        }
        this.messageSuccess(broker);
      });
  }

  private uploadPhoto(formData: FormData, brokerCreateResponse: BrokerCreateResponse): void {
    this.loadinService.show();

    this.brokerUploadService
      .upload(brokerCreateResponse.id, formData)
      .pipe(
        take(1),
        finalize(() => this.loadinService.hide())
      )
      .subscribe(() => this.messageSuccess(brokerCreateResponse));
  }

  private messageSuccess(broker: BrokerCreateResponse): void {
    this.form.markAsPristine();
    this.notificationService.success(`Corretor ${broker.nome} cadastrado com sucesso!`);
    this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
  }

}
