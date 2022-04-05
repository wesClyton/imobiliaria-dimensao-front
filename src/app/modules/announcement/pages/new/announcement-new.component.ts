import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PanelAdminComponent } from '../../../../panel-admin/panel-admin.component';
import { CrudActionBack } from '../../../../shared/components/crud-actions/interfaces/crud-action-back.interface';
import { CrudActionSave } from '../../../../shared/components/crud-actions/interfaces/crud-action-save.interface';
import { CanDeactivateDialog } from '../../../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.interface';
import { ANNOUNCEMENT_CONFIG } from '../../announcement.config';
import { AnnouncementFormNewComponent } from '../../components/form-new/announcement-form-new.component';

@Component({
  selector: 'app-announcement-new',
  templateUrl: 'announcement-new.component.html'
})
export class AnnouncementNewComponent implements CrudActionSave, CrudActionBack, CanDeactivateDialog {

  @ViewChild(AnnouncementFormNewComponent, { static: false })
  private announcementFormNewComponent!: AnnouncementFormNewComponent;

  public canDeactivateMessage = 'Realmente deseja cancelar o cadastro do Anúncio?';

  constructor(
    private readonly router: Router
  ) { }

  public canDeactivate(): boolean {
    return !this.announcementFormNewComponent.form.dirty;
  }

  public crudActionSave(): void {
    this.announcementFormNewComponent.submit();
  }

  public crudActionBack(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat(ANNOUNCEMENT_CONFIG.pathFront));
  }

}
