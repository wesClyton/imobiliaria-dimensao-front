import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { CityGetAll } from 'src/app/modules/city/interfaces/city-get-all.interface';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { FormService } from '../../../../shared/services/form/form.service';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { DistrictCreate } from '../../interfaces/district-create.interface';
import { DistrictService } from '../../services/district.service';

@Component({
  selector: 'app-district-form-new',
  templateUrl: './district-form-new.component.html'
})
export class DistrictFormNewComponent implements OnInit {

  public form!: FormGroup;

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

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly notificationService: NotificationService,
    private readonly loadinService: LoadingService,
    private readonly districtService: DistrictService,
    private readonly router: Router,
    private readonly formService: FormService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl(null, [Validators.required]),
      cidadeId: new FormControl(null, [Validators.required])
    });
  }

  public submit(): void {
    if (this.form.invalid) {
      this.formService.validate(this.form);
      return;
    }

    this.loadinService.show();

    const district: DistrictCreate = {
      nome: this.controlNome?.value,
      cidadeId: this.controlCidadeId?.value
    }

    this.districtService
      .post(district)
      .pipe(
        take(1),
        finalize(() => this.loadinService.hide())
      )
      .subscribe(district => {
        this.form.markAsPristine();
        this.notificationService.success(`Bairro ${district.nome} cadastrado com sucesso!`);
        this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
      });
  }

}
