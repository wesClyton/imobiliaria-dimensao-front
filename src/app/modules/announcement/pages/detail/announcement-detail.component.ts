import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { NotificationService } from '../../../../core/notification/notification.service';
import { PanelAdminComponent } from '../../../../panel-admin/panel-admin.component';
import { AngularMaterialDialogConfirmationService } from '../../../../shared/angular-material/dialog-confirmation/angular-material-dialog-confirmation.service';
import { CrudActionBack } from '../../../../shared/components/crud-actions/interfaces/crud-action-back.interface';
import { CrudActionDelete } from '../../../../shared/components/crud-actions/interfaces/crud-action-delete.interface';
import { CrudActionSave } from '../../../../shared/components/crud-actions/interfaces/crud-action-save.interface';
import { CanDeactivateDialog } from '../../../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.interface';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { ANNOUNCEMENT_CONFIG } from '../../announcement.config';
import { AnnouncementFormDetailComponent } from '../../components/form-detail/announcement-form-detail.component';
import { Announcement } from '../../interfaces/announcement.interface';
import { AnnouncementService } from '../../services/announcement.service';

@Component({
  selector: 'app-announcement-detail',
  templateUrl: 'announcement-detail.component.html'
})
export class AnnouncementDetailComponent implements OnInit, CrudActionSave, CrudActionBack, CrudActionDelete, CanDeactivateDialog {

  @ViewChild(AnnouncementFormDetailComponent, { static: false })
  private announcementFormDetailComponent!: AnnouncementFormDetailComponent;

  public canDeactivateMessage = 'Realmente deseja cancelar a edição do Anúncio?';

  public announcement!: Announcement;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly notificationService: NotificationService,
    private readonly announcementService: AnnouncementService,
    private readonly angularMaterialDialogConfirmationService: AngularMaterialDialogConfirmationService
  ) { }

  ngOnInit(): void {
    this.announcement = this.activatedRoute.snapshot.data.announcement;
    if (!this.announcement) {
      this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
      this.notificationService.error('Anúncio não encontrado!');
    }
  }

  public canDeactivate(): boolean {
    return !this.announcementFormDetailComponent.form.dirty;
  }

  public crudActionSave(): void {
    this.announcementFormDetailComponent.submit();
  }

  public crudActionBack(): void {
    this.router.navigateByUrl(PanelAdminComponent.pathConcat(ANNOUNCEMENT_CONFIG.pathFront));
  }

  public async crudActionDelete(): Promise<void> {
    const confirmation = await this.angularMaterialDialogConfirmationService?.confirm({
      message: `Realmente deseja excluir o Anúncio ${this.announcement.titulo}?`
    });
    if (!confirmation) {
      return;
    }
    this.announcementService.delete(this.announcement.id).pipe(take(1)).subscribe(() => {
      this.notificationService.success(`Anúncio ${this.announcement.titulo} excluído com sucesso!`);
      this.crudActionBack();
    });
  }

}
