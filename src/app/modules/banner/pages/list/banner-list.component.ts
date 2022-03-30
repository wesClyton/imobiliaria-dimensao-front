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
import { Banner } from '../../interfaces/banner-create.interface';
import { BannerGetAll } from '../../interfaces/banner-get-all.interface';
import { BannerService } from '../../services/banner.service';

@Component({
  selector: 'app-banner-list',
  templateUrl: 'banner-list.component.html',
  styleUrls: ['./banner-list.component.scss']
})
export class BannerListComponent implements OnInit, AngularMaterialTableInputs<Banner>, CrudActionNew, CrudActionBack {

  private bannerGetAll!: BannerGetAll;

  public tableDataSource!: MatTableDataSource<Banner>;

  public tableDisplayedColumns = ['foto', 'nome', 'link'];

  public tableActions: AngularMaterialTableActions<Banner> = {
    items: [
      {
        ...AngularMaterialTableActionsUtils.detailDefault(),
        action: banner => this.navigateDetail(banner)
      },
      {
        ...AngularMaterialTableActionsUtils.deleteDefault(),
        action: banner => this.delete(banner)
      }
    ]
  };

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly bannerService: BannerService,
    private readonly notificationService: NotificationService,
    private readonly loadingService: LoadingService,
    private readonly angularMaterialDialogConfirmationService: AngularMaterialDialogConfirmationService
  ) { }

  ngOnInit(): void {
    this.bannerGetAll = this.activatedRoute.snapshot.data.bannerGetAll;
    this.tableLoadContent(this.bannerGetAll);
  }

  private tableLoadContent(banners: BannerGetAll): void {
    this.tableDataSource = new MatTableDataSource(banners.data);
  }

  public navigateDetail(banner: Banner): void {
    this.router.navigate([`detail/${banner.id}`], { relativeTo: this.activatedRoute })
  }

  public crudActionBack(): void {
    this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
  }

  public crudActionNew(): void {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute })
  }

  private async delete(banner: Banner): Promise<void> {
    const confirmation = await this.angularMaterialDialogConfirmationService?.confirm({
      message: `Realmente deseja excluir o Banner ${banner.nome}?`
    });
    if (!confirmation) {
      return;
    }

    this.bannerService.delete(banner.id).subscribe(() => {
      this.notificationService.success(`Banner ${banner.nome} excluído com sucesso!`);
      this.getCharacteristic();
    });
  }

  private getCharacteristic(): void {
    this.loadingService.show();
    this.bannerService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(banners => this.tableLoadContent(banners));
  }

}
