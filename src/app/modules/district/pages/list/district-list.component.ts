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
import { DistrictGetAll } from '../../interfaces/district-get-all.interface';
import { District } from '../../interfaces/district.interface';
import { DistrictService } from '../../services/district.service';

@Component({
  selector: 'app-district-list',
  templateUrl: 'district-list.component.html'
})
export class DistrictListComponent implements OnInit, TableInputs<District>, CrudActionNew, CrudActionBack {

  public districtGetAll!: DistrictGetAll;

  public tableDataSource!: MatTableDataSource<District>;

  public readonly tableDisplayedColumns = ['nome', 'cidade'];

  public readonly tableShowActions = this.authService.isAdmin || this.authService.isAutor;

  public readonly tableActions: TableActions<District> = {
    items: [
      {
        ...TableActionsUtils.detailDefault(),
        action: district => this.navigateDetail(district)
      },
      {
        ...TableActionsUtils.deleteDefault(),
        action: district => this.delete(district)
      }
    ]
  };

  public readonly tableFilterInputTextPlaceholder = 'Filtre pelo nome';

  public readonly newShow = this.authService.isAdmin || this.authService.isAutor;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly districtService: DistrictService,
    private readonly notificationService: NotificationService,
    private readonly loadingService: LoadingService,
    private readonly dialogConfirmationService: DialogConfirmationService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.districtGetAll = this.activatedRoute.snapshot.data.districtGetAll;
    this.tableLoadContent(this.districtGetAll);
  }

  private tableLoadContent(districts: DistrictGetAll): void {
    this.tableDataSource = new MatTableDataSource(districts.data);
  }

  public navigateDetail(district: District): void {
    this.router.navigate([`detail/${district.id}`], { relativeTo: this.activatedRoute });
  }

  public crudActionBack(): void {
    this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
  }

  public crudActionNew(): void {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  private async delete(district: District): Promise<void> {
    const confirmation = await this.dialogConfirmationService?.confirm({
      message: `Realmente deseja excluir o Bairro ${district.nome}?`
    });
    if (!confirmation) {
      return;
    }

    this.loadingService.show();

    this.districtService
      .delete(district.id)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(() => {
        this.notificationService.success(`Bairro ${district.nome} excluído com sucesso!`);
        this.getDistricts();
      });
  }

  public getDistricts(queryFilters: Array<QueryFilterParam> = new Array<QueryFilterParam>()): void {
    this.districtService.queryFilterAdd(queryFilters);

    this.loadingService.show();

    this.districtService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(districts => this.tableLoadContent(districts));
  }

}
