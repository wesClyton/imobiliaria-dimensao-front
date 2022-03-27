import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../../core/notification/notification.service';
import { PanelAdminComponent } from '../../../../panel-admin/panel-admin.component';
import { CanDeactivateDialog } from '../../../../shared/components/can-deactivate-dialog/can-deactivate-dialog.interface';
import { CrudActionBack } from '../../../../shared/components/crud-actions/interfaces/crud-action-back.interface';
import { CrudActionDelete } from '../../../../shared/components/crud-actions/interfaces/crud-action-delete.interface';
import { CrudActionSave } from '../../../../shared/components/crud-actions/interfaces/crud-action-save.interface';
import { UrlUtil } from '../../../../shared/utils/url.util';
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
  private stateFormDetailComponent!: StateFormDetailComponent;

  public canDeactivateMessage = 'Realmente deseja cancelar a edição do Estado?';

  public state!: State;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificationService: NotificationService,
    private readonly stateService: StateService
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

  public crudActionDelete(): void {
    this.stateService.delete(this.state.id).subscribe(() => {
      this.notificationService.success('Estado excluído com sucesso!');
      this.crudActionBack();
    });
  }

}
