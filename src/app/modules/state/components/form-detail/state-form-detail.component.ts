import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { StateBr } from '../../../../shared/components/state-br/state-br.interface';
import { StateBrUtil } from '../../../../shared/components/state-br/state-br.util';
import { FormService } from '../../../../shared/services/form/form.service';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { StateUpdate } from '../../interfaces/state-update.interface';
import { State } from '../../interfaces/state.interface';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-state-form-detail',
  templateUrl: './state-form-detail.component.html'
})
export class StateFormDetailComponent implements OnInit {

  public form!: FormGroup;

  private get controlUf(): AbstractControl | null {
    return this.form?.get('uf');
  }

  public get controlUfHasError(): boolean | undefined {
    return this.controlUf?.dirty || this.controlUf?.hasError('required');
  }

  public statesBr!: Array<StateBr>;

  @Input()
  public state!: State;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly notificationService: NotificationService,
    private readonly loadinService: LoadingService,
    private readonly stateService: StateService,
    private readonly router: Router,
    private readonly formService: FormService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      uf: new FormControl(null, [Validators.required])
    });

    if (this.state) {
      this.setValueForm(this.state);
    }
  }

  private setValueForm(state: State): void {
    this.form.patchValue(state);
  }

  public submit(): void {
    if (this.form.invalid) {
      this.formService.validade(this.form);
      return;
    }

    this.loadinService.show();

    const uf: string = this.form.get('uf')?.value;

    const state: StateUpdate = {
      id: this.state.id,
      nome: StateBrUtil.getNameByUf(uf),
      uf
    }

    this.stateService
      .put(state)
      .pipe(
        take(1),
        finalize(() => this.loadinService.hide())
      )
      .subscribe(state => {
        this.form.markAsPristine();
        this.notificationService.success(`Estado ${state.nome} alterado com sucesso!`);
        this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
      });
  }

}
