import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { StateBr } from '../../../../shared/components/state-br/state-br.interface';
import { StateBrUtil } from '../../../../shared/components/state-br/state-br.util';
import { FormService } from '../../../../shared/services/form/form.service';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { StateCreate } from '../../interfaces/state-create.interface';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-state-form-new',
  templateUrl: './state-form-new.component.html'
})
export class StateFormNewComponent implements OnInit {

  public form!: UntypedFormGroup;

  private get controlUf(): AbstractControl | null {
    return this.form?.get('uf');
  }

  public get controlUfHasError(): boolean | undefined {
    return this.controlUf?.dirty || this.controlUf?.hasError('required');
  }

  public statesBr!: Array<StateBr>;

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
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
      uf: new UntypedFormControl(null, [Validators.required])
    });
  }

  public submit(): void {
    if (this.form.invalid) {
      this.formService.validate(this.form);
      return;
    }

    this.loadinService.show();

    const uf: string = this.form.get('uf')?.value;

    const state: StateCreate = {
      nome: StateBrUtil.getNameByUf(uf),
      uf
    }

    this.stateService
      .post(state)
      .pipe(
        take(1),
        finalize(() => this.loadinService.hide())
      )
      .subscribe(state => {
        this.form.markAsPristine();
        this.notificationService.success(`Estado ${state.nome} cadastrado com sucesso!`);
        this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
      });
  }

}
