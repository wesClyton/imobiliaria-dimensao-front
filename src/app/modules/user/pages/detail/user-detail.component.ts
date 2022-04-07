import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { PanelAdminComponent } from '../../../../panel-admin/panel-admin.component';
import { AngularMaterialDialogConfirmationService } from '../../../../shared/angular-material/dialog-confirmation/angular-material-dialog-confirmation.service';
import { CrudActionBack } from '../../../../shared/components/crud-actions/interfaces/crud-action-back.interface';
import { CrudActionDelete } from '../../../../shared/components/crud-actions/interfaces/crud-action-delete.interface';
import { CrudActionSave } from '../../../../shared/components/crud-actions/interfaces/crud-action-save.interface';
import { CanDeactivateDialog } from '../../../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.interface';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { UserFormDetailComponent } from '../../components/form-detail/user-form-detail.component';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { USER_CONFIG } from '../../user.config';

@Component({
  selector: 'app-user-detail',
  templateUrl: 'user-detail.component.html'
})
export class UserDetailComponent implements OnInit, CrudActionSave, CrudActionBack, CrudActionDelete, CanDeactivateDialog {

  @ViewChild(UserFormDetailComponent, { static: false })
  private userFormDetailComponent!: UserFormDetailComponent;

  public canDeactivateMessage = 'Realmente deseja cancelar a edição do Usuário?';

  public user!: User;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificationService: NotificationService,
    private readonly userService: UserService,
    private readonly angularMaterialDialogConfirmationService: AngularMaterialDialogConfirmationService,
    private readonly loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.data.user;
    if (!this.user) {
      this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
      this.notificationService.error('Usuário não encontrado!');
    }
  }

  public canDeactivate(): boolean {
    return !this.userFormDetailComponent.form.dirty;
  }

  public crudActionSave(): void {
    this.userFormDetailComponent.submit();
  }

  public crudActionBack(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat(USER_CONFIG.pathFront));
  }

  public async crudActionDelete(): Promise<void> {
    const confirmation = await this.angularMaterialDialogConfirmationService?.confirm({
      message: `Realmente deseja excluir o Usuário ${this.user.nome}?`
    });
    if (!confirmation) {
      return;
    }

    this.loadingService.show();

    this.userService
      .delete(this.user.id)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(() => {
        this.notificationService.success(`Usuário ${this.user.nome} excluído com sucesso!`);
        this.crudActionBack();
      });
  }

}
