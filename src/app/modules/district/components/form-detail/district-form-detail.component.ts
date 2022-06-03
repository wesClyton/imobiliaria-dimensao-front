import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { CityGetAll } from 'src/app/modules/city/interfaces/city-get-all.interface';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { FormService } from '../../../../shared/services/form/form.service';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { AuthService } from '../../../auth/services/auth.service';
import { DistrictUpdate } from '../../interfaces/district-update.interface';
import { District } from '../../interfaces/district.interface';
import { DistrictService } from '../../services/district.service';

@Component({
  selector: 'app-district-form-detail',
  templateUrl: './district-form-detail.component.html'
})
export class DistrictFormDetailComponent implements OnInit {

  public form!: UntypedFormGroup;

  private get controlNome(): AbstractControl | null {
    return this.form?.get('nome');
  }

  public get controlNomeHasError(): boolean | undefined {
    return this.controlNome?.dirty || this.controlNome?.hasError('required');
  }

  private get controlCidadeId(): AbstractControl | null {
    return this.form?.get('cidadeId');
  }

  public get controlCidadeIdHasError(): boolean | undefined {
    return this.controlCidadeId?.dirty || this.controlCidadeId?.hasError('required');
  }

  public cities!: CityGetAll;

  @Input()
  public district!: District;

  private get disableFields(): boolean {
    return this.authService.isLeitor || this.authService.isCorretor;
  }

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly notificationService: NotificationService,
    private readonly loadinService: LoadingService,
    private readonly districtService: DistrictService,
    private readonly router: Router,
    private readonly formService: FormService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      nome: new UntypedFormControl(null, [Validators.required]),
      cidadeId: new UntypedFormControl(null, [Validators.required])
    });

    if (this.district) {
      this.setValueForm(this.district);
    }
  }

  private setValueForm(district: District): void {
    this.controlNome?.setValue(district.nome);
    this.controlCidadeId?.setValue(district.cidade.id);

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

    const district: DistrictUpdate = {
      id: this.district.id,
      nome: this.controlNome?.value,
      cidadeId: this.controlCidadeId?.value
    }

    this.districtService
      .put(district)
      .pipe(
        take(1),
        finalize(() => this.loadinService.hide())
      )
      .subscribe(district => {
        this.form.markAsPristine();
        this.notificationService.success(`Bairro ${district.nome} alterado com sucesso!`);
        this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
      });
  }

}
