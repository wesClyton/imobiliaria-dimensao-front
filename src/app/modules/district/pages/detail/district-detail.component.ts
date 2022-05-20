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
import { DISTRICT_CONFIG } from '../../district.config';
import { DistrictFormDetailComponent } from '../../components/form-detail/district-form-detail.component';
import { District } from '../../interfaces/district.interface';
import { DistrictService } from '../../services/district.service';

@Component({
  selector: 'app-district-detail',
  templateUrl: 'district-detail.component.html'
})
export class DistrictDetailComponent implements OnInit, CrudActionSave, CrudActionBack, CrudActionDelete, CanDeactivateDialog {

  @ViewChild(DistrictFormDetailComponent, { static: false })
  private readonly districtFormDetailComponent!: DistrictFormDetailComponent;

  public readonly canDeactivateMessage = 'Realmente deseja cancelar a edição da Cidade?';

  public district!: District;

  public readonly saveShow = this.authService.isAdmin || this.authService.isAutor;

  public readonly deleteShow = this.authService.isAdmin || this.authService.isAutor;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificationService: NotificationService,
    private readonly districtService: DistrictService,
    private readonly angularMaterialDialogConfirmationService: DialogConfirmationService,
    private readonly loadingService: LoadingService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.district = this.activatedRoute.snapshot.data.district;
    if (!this.district) {
      this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
      this.notificationService.error('Bairro não encontrado!');
    }
  }

  public canDeactivate(): boolean {
    return !this.districtFormDetailComponent.form.dirty;
  }

  public crudActionSave(): void {
    this.districtFormDetailComponent.submit();
  }

  public crudActionBack(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat(DISTRICT_CONFIG.pathFront));
  }

  public async crudActionDelete(): Promise<void> {
    const confirmation = await this.angularMaterialDialogConfirmationService?.confirm({
      message: `Realmente deseja excluir o Bairro ${this.district.nome}?`
    });
    if (!confirmation) {
      return;
    }

    this.loadingService.show();

    this.districtService
      .delete(this.district.id)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(() => {
        this.notificationService.success(`Bairro ${this.district.nome} excluído com sucesso!`);
        this.crudActionBack();
      });
  }

}
