import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { FormService } from '../../../../shared/services/form/form.service';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { BrokerUpdate } from '../../interfaces/broker-update.interface';
import { Broker } from '../../interfaces/broker.interface';
import { BrokerService } from '../../services/broker.service';

@Component({
  selector: 'app-broker-form-detail',
  templateUrl: './broker-form-detail.component.html'
})
export class BrokerFormDetailComponent implements OnInit {

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

  public get controlAtivo(): AbstractControl | null {
    return this.form?.get('ativo');
  }

  @Input()
  public broker!: Broker;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly notificationService: NotificationService,
    private readonly loadinService: LoadingService,
    private readonly brokerService: BrokerService,
    private readonly router: Router,
    private readonly formService: FormService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl(null, [Validators.required]),
      funcao: new FormControl(null),
      telefone: new FormControl(null, [Validators.required]),
      whatsapp: new FormControl(null),
      email: new FormControl(null, [Validators.required, Validators.email]),
      biografia: new FormControl(null),
      creci: new FormControl(null),
      instagram: new FormControl(null),
      facebook: new FormControl(null),
      linkedin: new FormControl(null),
      ativo: new FormControl(false)
    });

    if (this.broker) {
      this.setValueForm(this.broker);
    }
  }

  private setValueForm(broker: Broker): void {
    this.form.patchValue(broker);
  }

  public submit(): void {
    if (this.form.invalid) {
      this.formService.validade(this.form);
      return;
    }

    this.loadinService.show();

    const broker: BrokerUpdate = {
      id: this.broker.id,
      ativo: this.controlAtivo?.value,
      biografia: this.controlBiografia?.value,
      creci: this.controlCreci?.value,
      email: this.controlEmail?.value,
      facebook: this.controlFacebook?.value,
      funcao: this.controlFuncao?.value,
      instagram: this.controlInstagram?.value,
      linkedin: this.controlLinkedin?.value,
      nome: this.controlNome?.value,
      telefone: this.controlTelefone?.value,
      whatsapp: this.controlWhatsApp?.value
    }

    this.brokerService
      .put(broker)
      .pipe(
        take(1),
        finalize(() => this.loadinService.hide())
      )
      .subscribe(broker => {
        this.form.markAsPristine();
        this.notificationService.success(`Corretor ${broker.nome} alterado com sucesso!`);
        this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
      });
  }

}
