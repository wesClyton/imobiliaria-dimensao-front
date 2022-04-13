import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { LoadingService } from '../../../../core/loading/loading.service';
import { NotificationService } from '../../../../core/notification/notification.service';
import { CrudActionBack } from '../../../../shared/components/crud-actions/interfaces/crud-action-back.interface';
import { CrudActionNew } from '../../../../shared/components/crud-actions/interfaces/crud-action-new.interface';
import { DialogConfirmationService } from '../../../../shared/components/dialog-confirmation/dialog-confirmation.service';
import { TableActions } from '../../../../shared/components/table/interfaces/table-actions.interface';
import { TableInputs } from '../../../../shared/components/table/interfaces/table-inputs.interface';
import { TableActionsUtils } from '../../../../shared/components/table/utils/table-actions.utils';
import { QueryFilterParam } from '../../../../shared/services/http/query-filter/query-filter.interface';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { AuthService } from '../../../auth/services/auth.service';
import { AnnouncementGetAll } from '../../interfaces/announcement-get-all.interface';
import { AnnouncementUpdate } from '../../interfaces/announcement-update.interface';
import { Announcement } from '../../interfaces/announcement.interface';
import { AnnouncementService } from '../../services/announcement.service';

@Component({
  selector: 'app-announcement-list',
  templateUrl: 'announcement-list.component.html'
})
export class AnnouncementListComponent implements OnInit, TableInputs<Announcement>, CrudActionNew, CrudActionBack {

  private announcementGetAll!: AnnouncementGetAll;

  public tableDataSource!: MatTableDataSource<Announcement>;

  public readonly tableDisplayedColumns = ['codigoAnuncio', 'titulo', 'tipo', 'expiracaoAnuncio', 'cidade', 'ativo'];

  public tableActions!: TableActions<Announcement>;

  public get newShow(): boolean {
    return this.authService.isAdmin || this.authService.isAutor;
  }

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly announcementService: AnnouncementService,
    private readonly notificationService: NotificationService,
    private readonly loadingService: LoadingService,
    private readonly angularMaterialDialogConfirmationService: DialogConfirmationService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.announcementGetAll = this.activatedRoute.snapshot.data.announcementGetAll;
    this.tableLoadContent(this.announcementGetAll);
  }

  public createActions(announcement: Announcement): void {
    this.tableActions = {
      items: [
        {
          ...TableActionsUtils.detailDefault(),
          action: announcement => this.navigateDetail(announcement)
        },
        {
          ...TableActionsUtils.activeDefault(),
          action: announcement => this.updateStatus(announcement),
          visible: !announcement.ativo && (this.authService.isAdmin || this.authService.isAutor)
        },
        {
          ...TableActionsUtils.inactiveDefault(),
          action: announcement => this.updateStatus(announcement),
          visible: announcement.ativo && (this.authService.isAdmin || this.authService.isAutor)
        },
        {
          ...TableActionsUtils.deleteDefault(),
          action: announcement => this.delete(announcement),
          visible: this.authService.isAdmin || this.authService.isAutor
        }
      ]
    };
  }

  private updateStatus(announcement: Announcement): void {
    const announcementUpdate: AnnouncementUpdate = {
      id: announcement.id,
      ativo: !announcement.ativo
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

    this.loadingService.show();

    this.announcementService
      .delete(announcement.id)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(() => {
        this.notificationService.success(`Anúncio ${announcement.titulo} excluído com sucesso!`);
        this.getAnnouncements();
      });
  }

  public getAnnouncements(queryFilters: Array<QueryFilterParam> = new Array<QueryFilterParam>()): void {
    this.announcementService.queryFilterAdd(queryFilters);

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
