import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { Banner } from '../../interfaces/banner.interface';
import { BannerGetAll } from '../../interfaces/banner-get-all.interface';
import { BannerUpdate } from '../../interfaces/banner-update.interface';
import { BannerService } from '../../services/banner.service';
import { MatDialog } from '@angular/material/dialog';
import { BannerOrderComponent } from '../../components/order/banner-order.component';
import { BannerOrderService } from '../../services/banner-order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-banner-list',
  templateUrl: 'banner-list.component.html',
  styleUrls: ['./banner-list.component.scss']
})
export class BannerListComponent implements OnInit, OnDestroy, TableInputs<Banner>, CrudActionNew, CrudActionBack {

  public bannerGetAll!: BannerGetAll;

  public tableDataSource!: MatTableDataSource<Banner>;

  public readonly tableDisplayedColumns = ['foto', 'nome', 'link', 'ativo'];

  public tableActions!: TableActions<Banner>;

  public readonly tableShowActions = this.authService.isAdmin || this.authService.isAutor;

  public readonly newShow = this.authService.isAdmin || this.authService.isAutor;

  private subscription = new Subscription();

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly bannerService: BannerService,
    private readonly notificationService: NotificationService,
    private readonly loadingService: LoadingService,
    private readonly angularMaterialDialogConfirmationService: DialogConfirmationService,
    private readonly authService: AuthService,
    private readonly matDialog: MatDialog,
    private readonly bannerOrderService: BannerOrderService
  ) { }

  ngOnInit(): void {
    this.bannerGetAll = this.activatedRoute.snapshot.data.bannerGetAll;
    this.tableLoadContent(this.bannerGetAll);

    this.subscription.add(this.bannerOrderService.ordenationCompleted$.subscribe(() => this.getBanners()));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public createActions(banner: Banner): void {
    this.tableActions = {
      items: [
        {
          ...TableActionsUtils.detailDefault(),
          action: banner => this.navigateDetail(banner)
        },
        {
          ...TableActionsUtils.activeDefault(),
          action: banner => this.updateStatus(banner),
          visible: !banner.ativo
        },
        {
          ...TableActionsUtils.inactiveDefault(),
          action: banner => this.updateStatus(banner),
          visible: banner.ativo
        },
        {
          ...TableActionsUtils.deleteDefault(),
          action: banner => this.delete(banner)
        }
      ]
    }
  }

  private updateStatus(banner: Banner): void {
    const bannerUpdate: BannerUpdate = {
      id: banner.id,
      ativo: !banner.ativo
    } as BannerUpdate;

    this.bannerService.put(bannerUpdate).pipe(take(1)).subscribe(() => this.getBanners());
  }

  private tableLoadContent(banners: BannerGetAll): void {
    this.bannerGetAll = banners;
    this.tableDataSource = new MatTableDataSource(this.bannerGetAll.data);
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

    this.loadingService.show();

    this.bannerService
      .delete(banner.id)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(() => {
        this.notificationService.success(`Banner ${banner.nome} excluído com sucesso!`);
        this.getBanners();
      });
  }

  public getBanners(queryFilters: Array<QueryFilterParam> = new Array<QueryFilterParam>()): void {
    this.bannerService.queryFilterAdd(queryFilters);

    this.loadingService.show();

    this.bannerService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(banners => this.tableLoadContent(banners));
  }

  public orderBanners(): void {
    this.matDialog.open(BannerOrderComponent, {
      data: {
        banners: this.bannerGetAll.data
      }
    });
  }

}
