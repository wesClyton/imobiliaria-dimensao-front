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
import { BANNER_CONFIG } from '../../banner.config';
import { BannerFormDetailComponent } from '../../components/form-detail/banner-form-detail.component';
import { Banner } from '../../interfaces/banner-create.interface';
import { BannerService } from '../../services/banner.service';

@Component({
  selector: 'app-banner-detail',
  templateUrl: 'banner-detail.component.html'
})
export class BannerDetailComponent implements OnInit, CrudActionSave, CrudActionBack, CrudActionDelete, CanDeactivateDialog {

  @ViewChild(BannerFormDetailComponent, { static: false })
  private bannerFormDetailComponent!: BannerFormDetailComponent;

  public canDeactivateMessage = 'Realmente deseja cancelar a edição do Banner?';

  public banner!: Banner;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificationService: NotificationService,
    private readonly bannerService: BannerService,
    private readonly angularMaterialDialogConfirmationService: AngularMaterialDialogConfirmationService,
    private readonly loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.banner = this.activatedRoute.snapshot.data.banner;
    if (!this.banner) {
      this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
      this.notificationService.error('Banner não encontrado!');
    }
  }

  public canDeactivate(): boolean {
    return !this.bannerFormDetailComponent.form.dirty;
  }

  public crudActionSave(): void {
    this.bannerFormDetailComponent.submit();
  }

  public crudActionBack(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat(BANNER_CONFIG.pathFront));
  }

  public async crudActionDelete(): Promise<void> {
    const confirmation = await this.angularMaterialDialogConfirmationService?.confirm({
      message: `Realmente deseja excluir o Banner ${this.banner.nome}?`
    });
    if (!confirmation) {
      return;
    }

    this.loadingService.show();

    this.bannerService
      .delete(this.banner.id)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(() => {
        this.notificationService.success(`Banner ${this.banner.nome} excluído com sucesso!`);
        this.crudActionBack();
      });
  }

}
