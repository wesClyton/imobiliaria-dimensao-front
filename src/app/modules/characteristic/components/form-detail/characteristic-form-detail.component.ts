import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { FormService } from '../../../../shared/services/form/form.service';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { AuthService } from '../../../auth/services/auth.service';
import { CharacteristicType } from '../../interfaces/characteristic-type.interface';
import { CharacteristicUpdate } from '../../interfaces/characteristic-update.interface';
import { Characteristic } from '../../interfaces/characteristic.interface';
import { CharacteristicService } from '../../services/characteristic.service';

@Component({
  selector: 'app-characteristic-form-detail',
  templateUrl: './characteristic-form-detail.component.html'
})
export class CharacteristicFormDetailComponent implements OnInit {

  public form!: FormGroup;

  private get controlNome(): AbstractControl | null {
    return this.form?.get('nome');
  }

  public get controlNomeHasError(): boolean | undefined {
    return this.controlNome?.dirty || this.controlNome?.hasError('required');
  }

  private get controlTipo(): AbstractControl | null {
    return this.form?.get('tipo');
  }

  public get controlTipoHasError(): boolean | undefined {
    return this.controlTipo?.dirty || this.controlTipo?.hasError('required');
  }

  @Input()
  public characteristic!: Characteristic;

  public characteristicTypes!: Array<CharacteristicType>;

  private get disableFields(): boolean {
    return this.authService.isLeitor || this.authService.isCorretor;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly notificationService: NotificationService,
    private readonly loadinService: LoadingService,
    private readonly characteristicService: CharacteristicService,
    private readonly router: Router,
    private readonly formService: FormService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl(null, [Validators.required]),
      tipo: new FormControl(null, [Validators.required])
    });

    if (this.characteristic) {
      this.setValueForm(this.characteristic);
    }
  }

  private setValueForm(characteristic: Characteristic): void {
    this.form.patchValue(characteristic);

    if (this.disableFields) {
      this.form.disable();
    }
  }

  public submit(): void {
    if (this.form.invalid) {
      this.formService.validade(this.form);
      return;
    }

    this.loadinService.show();

    const characteristic: CharacteristicUpdate = {
      id: this.characteristic.id,
      nome: this.controlNome?.value,
      tipo: this.controlTipo?.value
    }

    this.characteristicService
      .put(characteristic)
      .pipe(
        take(1),
        finalize(() => this.loadinService.hide())
      )
      .subscribe(characteristic => {
        this.form.markAsPristine();
        this.notificationService.success(`Característica ${characteristic.nome} alterada com sucesso!`);
        this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
      });
  }

}
