import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { NotificationService } from '../../../../core/notification/notification.service';
import { PanelAdminComponent } from '../../../../panel-admin/panel-admin.component';
import { CrudActionBack } from '../../../../shared/components/crud-actions/interfaces/crud-action-back.interface';
import { CrudActionDelete } from '../../../../shared/components/crud-actions/interfaces/crud-action-delete.interface';
import { CrudActionSave } from '../../../../shared/components/crud-actions/interfaces/crud-action-save.interface';
import { DialogConfirmationService } from '../../../../shared/components/dialog-confirmation/dialog-confirmation.service';
import { CanDeactivateDialog } from '../../../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.interface';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { AuthService } from '../../../auth/services/auth.service';
import { StateFormDetailComponent } from '../../components/form-detail/state-form-detail.component';
import { State } from '../../interfaces/state.interface';
import { StateService } from '../../services/state.service';
import { STATE_CONFIG } from '../../state.config';

@Component({
  selector: 'app-state-detail',
  templateUrl: 'state-detail.component.html'
})
export class StateDetailComponent implements OnInit, CrudActionSave, CrudActionBack, CrudActionDelete, CanDeactivateDialog {

  @ViewChild(StateFormDetailComponent, { static: false })
  private readonly stateFormDetailComponent!: StateFormDetailComponent;

  public readonly canDeactivateMessage = 'Realmente deseja cancelar a edição do Estado?';

  public state!: State;

  public readonly saveShow = this.authService.isAdmin || this.authService.isAutor;

  public readonly deleteShow = this.authService.isAdmin || this.authService.isAutor;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificationService: NotificationService,
    private readonly stateService: StateService,
    private readonly angularMaterialDialogConfirmationService: DialogConfirmationService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.state = this.activatedRoute.snapshot.data.state;
    if (!this.state) {
      this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
      this.notificationService.error('Estado não encontrado!');
    }
  }

  public canDeactivate(): boolean {
    return !this.stateFormDetailComponent.form.dirty;
  }

  public crudActionSave(): void {
    this.stateFormDetailComponent.submit();
  }

  public crudActionBack(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat(STATE_CONFIG.pathFront));
  }

  public async crudActionDelete(): Promise<void> {
    const confirmation = await this.angularMaterialDialogConfirmationService?.confirm({
      message: `Realmente deseja excluir o Estado ${this.state.nome}?`
    });
    if (!confirmation) {
      return;
    }
    this.stateService.delete(this.state.id).pipe(take(1)).subscribe(() => {
      this.notificationService.success(`Estado ${this.state.nome} excluído com sucesso!`);
      this.crudActionBack();
    });
  }

}
