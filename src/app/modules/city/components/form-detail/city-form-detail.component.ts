import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { FormService } from '../../../../shared/services/form/form.service';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { StateGetAll } from '../../../state/interfaces/state-get-all.interface';
import { StateService } from '../../../state/services/state.service';
import { CityUpdate } from '../../interfaces/city-update.interface';
import { City } from '../../interfaces/city.interface';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-city-form-detail',
  templateUrl: './city-form-detail.component.html'
})
export class CityFormDetailComponent implements OnInit {

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

  @Input()
  public city!: City;

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

    if (this.city) {
      this.setValueForm(this.city);
    }
  }

  private getStates(): void {
    this.stateService.getAll().pipe(take(1)).subscribe(states => this.states = states);
  }

  private setValueForm(city: City): void {
    this.controlNome?.setValue(city.nome);
    this.controlEstadoId?.setValue(city.estado.id);
  }

  public submit(): void {
    if (this.form.invalid) {
      this.formService.validade(this.form);
      return;
    }

    this.loadinService.show();

    const city: CityUpdate = {
      id: this.city.id,
      nome: this.controlNome?.value,
      estadoId: this.controlEstadoId?.value
    }

    this.cityService
      .put(city)
      .pipe(
        take(1),
        finalize(() => this.loadinService.hide())
      )
      .subscribe(city => {
        this.form.markAsPristine();
        this.notificationService.success(`Cidade ${city.nome} alterada com sucesso!`);
        this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
      });
  }

}
