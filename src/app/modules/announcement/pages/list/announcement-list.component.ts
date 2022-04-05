import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { AngularMaterialDialogConfirmationService } from '../../../../shared/angular-material/dialog-confirmation/angular-material-dialog-confirmation.service';
import { AngularMaterialTableActions } from '../../../../shared/angular-material/table/interfaces/angular-material-table-actions.interface';
import { AngularMaterialTableInputs } from '../../../../shared/angular-material/table/interfaces/angular-material-table-inputs.interface';
import { AngularMaterialTableActionsUtils } from '../../../../shared/angular-material/table/utils/angular-material-table-actions.utils';
import { CrudActionBack } from '../../../../shared/components/crud-actions/interfaces/crud-action-back.interface';
import { CrudActionNew } from '../../../../shared/components/crud-actions/interfaces/crud-action-new.interface';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { AnnouncementGetAll } from '../../interfaces/announcement-get-all.interface';
import { AnnouncementUpdate } from '../../interfaces/announcement-update.interface';
import { Announcement } from '../../interfaces/announcement.interface';
import { AnnouncementService } from '../../services/announcement.service';

@Component({
  selector: 'app-announcement-list',
  templateUrl: 'announcement-list.component.html'
})
export class AnnouncementListComponent implements OnInit, AngularMaterialTableInputs<Announcement>, CrudActionNew, CrudActionBack {

  private announcementGetAll!: AnnouncementGetAll;

  public tableDataSource!: MatTableDataSource<Announcement>;

  public tableDisplayedColumns = ['codigoAnuncio', 'titulo', 'tipo', 'expiracaoAnuncio', 'cidade', 'ativo'];

  public tableActions: AngularMaterialTableActions<Announcement> = {
    items: [
      {
        ...AngularMaterialTableActionsUtils.detailDefault(),
        action: announcement => this.navigateDetail(announcement)
      },
      {
        ...AngularMaterialTableActionsUtils.activeDefault(),
        action: announcement => this.activate(announcement)
      },
      {
        ...AngularMaterialTableActionsUtils.inactiveDefault(),
        action: announcement => this.inactivate(announcement)
      },
      {
        ...AngularMaterialTableActionsUtils.deleteDefault(),
        action: announcement => this.delete(announcement)
      }
    ]
  };

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly announcementService: AnnouncementService,
    private readonly notificationService: NotificationService,
    private readonly loadingService: LoadingService,
    private readonly angularMaterialDialogConfirmationService: AngularMaterialDialogConfirmationService
  ) { }

  ngOnInit(): void {
    this.announcementGetAll = this.activatedRoute.snapshot.data.announcementGetAll;
    this.tableLoadContent(this.announcementGetAll);
  }

  private activate(announcement: Announcement): void {
    const announcementUpdate: AnnouncementUpdate = {
      id: announcement.id,
      ativo: true
    } as AnnouncementUpdate;

    this.announcementService.put(announcementUpdate).pipe(take(1)).subscribe(() => this.getAnnouncements());
  }

  private inactivate(announcement: Announcement): void {
    const announcementUpdate: AnnouncementUpdate = {
      id: announcement.id,
      ativo: false
    } as AnnouncementUpdate;

    this.announcementService.put(announcementUpdate).pipe(take(1)).subscribe(() => this.getAnnouncements());
  }

  private tableLoadContent(announcements: AnnouncementGetAll): void {
    this.tableDataSource = new MatTableDataSource(announcements.data);
  }

  public navigateDetail(announcement: Announcement): void {
    this.router.navigate([`detail/${announcement.id}`], { relativeTo: this.activatedRoute })
  }

  public crudActionBack(): void {
    this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
  }

  public crudActionNew(): void {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute })
  }

  private async delete(announcement: Announcement): Promise<void> {
    const confirmation = await this.angularMaterialDialogConfirmationService?.confirm({
      message: `Realmente deseja excluir o Anúncio ${announcement.titulo}?`
    });
    if (!confirmation) {
      return;
    }

    this.announcementService.delete(announcement.id).subscribe(() => {
      this.notificationService.success(`Anúncio ${announcement.titulo} excluído com sucesso!`);
      this.getAnnouncements();
    });
  }

  private getAnnouncements(): void {
    this.loadingService.show();
    this.announcementService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(announcements => this.tableLoadContent(announcements));
  }

}
