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
import { CityGetAll } from '../../interfaces/city-get-all.interface';
import { City } from '../../interfaces/city.interface';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-city-list',
  templateUrl: 'city-list.component.html'
})
export class CityListComponent implements OnInit, TableInputs<City>, CrudActionNew, CrudActionBack {

  private cityGetAll!: CityGetAll;

  public tableDataSource!: MatTableDataSource<City>;

  public tableDisplayedColumns = ['nome', 'estado'];

  public tableActions: TableActions<City> = {
    items: [
      {
        ...TableActionsUtils.detailDefault(),
        action: city => this.navigateDetail(city)
      },
      {
        ...TableActionsUtils.deleteDefault(),
        action: city => this.delete(city)
      }
    ]
  };

  public tableFilterInputTextPlaceholder = 'Filtre pelo nome';

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly cityService: CityService,
    private readonly notificationService: NotificationService,
    private readonly loadingService: LoadingService,
    private readonly angularMaterialDialogConfirmationService: DialogConfirmationService
  ) { }

  ngOnInit(): void {
    this.cityGetAll = this.activatedRoute.snapshot.data.cityGetAll;
    this.tableLoadContent(this.cityGetAll);
  }

  private tableLoadContent(cities: CityGetAll): void {
    this.tableDataSource = new MatTableDataSource(cities.data);
  }

  public navigateDetail(city: City): void {
    this.router.navigate([`detail/${city.id}`], { relativeTo: this.activatedRoute })
  }

  public crudActionBack(): void {
    this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
  }

  public crudActionNew(): void {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute })
  }

  private async delete(city: City): Promise<void> {
    const confirmation = await this.angularMaterialDialogConfirmationService?.confirm({
      message: `Realmente deseja excluir a Cidade ${city.nome}?`
    });
    if (!confirmation) {
      return;
    }

    this.loadingService.show();

    this.cityService
      .delete(city.id)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(() => {
        this.notificationService.success(`Cidade ${city.nome} excluída com sucesso!`);
        this.getCities();
      });
  }

  public getCities(queryFilters: Array<QueryFilterParam> = new Array<QueryFilterParam>()): void {
    this.cityService.queryFilterAdd(queryFilters);

    this.loadingService.show();

    this.cityService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(cities => this.tableLoadContent(cities));
  }

}
