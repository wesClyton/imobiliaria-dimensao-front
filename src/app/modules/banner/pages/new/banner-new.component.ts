import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PanelAdminComponent } from '../../../../panel-admin/panel-admin.component';
import { CrudActionBack } from '../../../../shared/components/crud-actions/interfaces/crud-action-back.interface';
import { CrudActionSave } from '../../../../shared/components/crud-actions/interfaces/crud-action-save.interface';
import { CanDeactivateDialog } from '../../../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.interface';
import { BANNER_CONFIG } from '../../banner.config';
import { BannerFormNewComponent } from '../../components/form-new/banner-form-new.component';

@Component({
  selector: 'app-banner-new',
  templateUrl: 'banner-new.component.html'
})
export class BannerNewComponent implements CrudActionSave, CrudActionBack, CanDeactivateDialog {

  @ViewChild(BannerFormNewComponent, { static: false })
  private readonly bannerFormNewComponent!: BannerFormNewComponent;

  public readonly canDeactivateMessage = 'Realmente deseja cancelar o cadastro do Banner?';

  constructor(
    private readonly router: Router
  ) { }

  public canDeactivate(): boolean {
    return !this.bannerFormNewComponent.form.dirty;
  }

  public crudActionSave(): void {
    this.bannerFormNewComponent.submit();
  }

  public crudActionBack(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat(BANNER_CONFIG.pathFront));
  }

}
