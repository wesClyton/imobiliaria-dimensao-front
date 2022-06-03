import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { FormService } from '../../../../shared/services/form/form.service';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { CharacteristicCreate } from '../../interfaces/characteristic-create.interface';
import { CharacteristicType } from '../../interfaces/characteristic-type.interface';
import { CharacteristicService } from '../../services/characteristic.service';

@Component({
  selector: 'app-characteristic-form-new',
  templateUrl: './characteristic-form-new.component.html'
})
export class CharacteristicFormNewComponent implements OnInit {

  public form!: UntypedFormGroup;

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

  public characteristicTypes!: Array<CharacteristicType>;

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly notificationService: NotificationService,
    private readonly loadinService: LoadingService,
    private readonly characteristicService: CharacteristicService,
    private readonly router: Router,
    private readonly formService: FormService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      nome: new UntypedFormControl(null, [Validators.required]),
      tipo: new UntypedFormControl(null, [Validators.required])
    });
  }

  public submit(): void {
    if (this.form.invalid) {
      this.formService.validate(this.form);
      return;
    }

    this.loadinService.show();

    const characteristic: CharacteristicCreate = {
      nome: this.controlNome?.value,
      tipo: this.controlTipo?.value
    }

    this.characteristicService
      .post(characteristic)
      .pipe(
        take(1),
        finalize(() => this.loadinService.hide())
      )
      .subscribe(characteristic => {
        this.form.markAsPristine();
        this.notificationService.success(`Característica ${characteristic.nome} cadastrada com sucesso!`);
        this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
      });
  }

}
