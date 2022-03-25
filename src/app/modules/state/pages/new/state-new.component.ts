import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { CrudActionBack } from '../../../../shared/components/crud-actions/interfaces/crud-action-back.interface';
import { CrudActionSave } from '../../../../shared/components/crud-actions/interfaces/crud-action-save.interface';
import { CanDeactivateDialog } from '../../../../shared/guards/can-deactivate/can-deactivate-dialog.interface';
import { FormUtil } from '../../../../shared/utils/form.util';
import { StatesBrUtil } from '../../../../shared/utils/states-br.util';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { StatePostIn } from '../../interfaces/state-post-in.interface';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-state-new',
  templateUrl: 'state-new.component.html'
})
export class StateNewComponent implements OnInit, CrudActionSave, CrudActionBack, CanDeactivateDialog {

  public form!: FormGroup;

  public states = StatesBrUtil.getAll();

  public canDeactivateMessage = 'Realmente deseja cancelar o cadastro de Estado?';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly notificationService: NotificationService,
    private readonly loadinService: LoadingService,
    private readonly stateService: StateService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  public canDeactivate(): boolean {
    return !this.form.dirty;
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      uf: new FormControl(null, [Validators.required])
    })
  }

  public crudActionSave(): void {
    if (this.form.invalid) {
      FormUtil.validade(this.form);
      this.notificationService.warning('Verifique o formulário.');
      return;
    }

    this.loadinService.show();

    const uf: string = this.form.get('uf')?.value;

    const state: StatePostIn = {
      nome: StatesBrUtil.getNameByUf(uf),
      uf
    }

    this.stateService
      .post(state)
      .pipe(
        take(1),
        finalize(() => this.loadinService.hide())
      )
      .subscribe(state => {
        this.notificationService.success(`Estado ${state.nome} cadastrado com sucesso!`);
        this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
      });
  }

  public crudActionBack(): void {
    this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
  }

}
