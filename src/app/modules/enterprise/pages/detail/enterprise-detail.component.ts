import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { PanelAdminComponent } from '../../../../panel-admin/panel-admin.component';
import { CrudActionBack } from '../../../../shared/components/crud-actions/interfaces/crud-action-back.interface';
import { CrudActionDelete } from '../../../../shared/components/crud-actions/interfaces/crud-action-delete.interface';
import { CrudActionSave } from '../../../../shared/components/crud-actions/interfaces/crud-action-save.interface';
import { DialogConfirmationService } from '../../../../shared/components/dialog-confirmation/dialog-confirmation.service';
import { CanDeactivateDialog } from '../../../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.interface';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { AuthService } from '../../../auth/services/auth.service';
import { ENTERPRISE_CONFIG } from '../../enterprise.config';
import { EnterpriseFormDetailComponent } from '../../components/form-detail/enterprise-form-detail.component';
import { Enterprise } from '../../interfaces/enterprise.interface';
import { EnterpriseService } from '../../services/enterprise.service';

@Component({
  selector: 'app-enterprise-detail',
  templateUrl: 'enterprise-detail.component.html'
})
export class EnterpriseDetailComponent implements OnInit, CrudActionSave, CrudActionBack, CrudActionDelete, CanDeactivateDialog {

  @ViewChild(EnterpriseFormDetailComponent, { static: false })
  private readonly enterpriseFormDetailComponent!: EnterpriseFormDetailComponent;

  public readonly canDeactivateMessage = 'Realmente deseja cancelar a edição do Corretor?';

  public enterprise!: Enterprise;

  public get saveShow(): boolean {
    return this.authService.isAdmin || this.authService.isAutor;
  }

  public get deleteShow(): boolean {
    return this.authService.isAdmin || this.authService.isAutor;
  }

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificationService: NotificationService,
    private readonly enterpriseService: EnterpriseService,
    private readonly angularMaterialDialogConfirmationService: DialogConfirmationService,
    private readonly loadingService: LoadingService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.enterprise = this.activatedRoute.snapshot.data.enterprise;
    if (!this.enterprise) {
      this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
      this.notificationService.error('Corretor não encontrado!');
    }
  }

  public canDeactivate(): boolean {
    return !this.enterpriseFormDetailComponent.form.dirty;
  }

  public crudActionSave(): void {
    this.enterpriseFormDetailComponent.submit();
  }

  public crudActionBack(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat(ENTERPRISE_CONFIG.pathFront));
  }

  public async crudActionDelete(): Promise<void> {
    const confirmation = await this.angularMaterialDialogConfirmationService?.confirm({
      message: `Realmente deseja excluir o Corretor ${this.enterprise.nome}?`
    });
    if (!confirmation) {
      return;
    }

    this.loadingService.show();

    this.enterpriseService
      .delete(this.enterprise.id)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(() => {
        this.notificationService.success(`Corretor ${this.enterprise.nome} excluído com sucesso!`);
        this.crudActionBack();
      });
  }

}
