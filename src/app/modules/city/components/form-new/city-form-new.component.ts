import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { FormService } from '../../../../shared/services/form/form.service';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { StateGetAll } from '../../../state/interfaces/state-get-all.interface';
import { StateService } from '../../../state/services/state.service';
import { CityCreate } from '../../interfaces/city-create.interface';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-city-form-new',
  templateUrl: './city-form-new.component.html'
})
export class CityFormNewComponent implements OnInit {

  public form!: FormGroup;

  private get controlNome(): AbstractControl | null {
    return this.form?.get('nome');
  }

  public get controlNomeHasError(): boolean | undefined {
    return this.controlNome?.dirty || this.controlNome?.hasError('required');
  }

  private get controlEstadoId(): AbstractControl | null {
    return this.form?.get('estadoId');
  }

  public get controlEstadoIdHasError(): boolean | undefined {
    return this.controlEstadoId?.dirty || this.controlEstadoId?.hasError('required');
  }

  public states!: StateGetAll;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly notificationService: NotificationService,
    private readonly loadinService: LoadingService,
    private readonly cityService: CityService,
    private readonly router: Router,
    private readonly formService: FormService,
    private readonly stateService: StateService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getStates();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl(null, [Validators.required]),
      estadoId: new FormControl(null, [Validators.required])
    });
  }

  private getStates(): void {
    this.stateService.getAll().pipe(take(1)).subscribe(states => this.states = states);
  }

  public submit(): void {
    if (this.form.invalid) {
      this.formService.validade(this.form);
      return;
    }

    this.loadinService.show();

    const city: CityCreate = {
      nome: this.controlNome?.value,
      estadoId: this.controlEstadoId?.value
    }

    this.cityService
      .post(city)
      .pipe(
        take(1),
        finalize(() => this.loadinService.hide())
      )
      .subscribe(city => {
        this.form.markAsPristine();
        this.notificationService.success(`Cidade ${city.nome} cadastrada com sucesso!`);
        this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
      });
  }

}
