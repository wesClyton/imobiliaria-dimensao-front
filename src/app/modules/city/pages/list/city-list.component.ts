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
import { CityGetAll } from '../../interfaces/city-get-all.interface';
import { City } from '../../interfaces/city.interface';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-city-list',
  templateUrl: 'city-list.component.html'
})
export class CityListComponent implements OnInit, AngularMaterialTableInputs<City>, CrudActionNew, CrudActionBack {

  private cityGetAll!: CityGetAll;

  public tableDataSource!: MatTableDataSource<City>;

  public tableDisplayedColumns = ['nome', 'estado'];

  public tableActions: AngularMaterialTableActions<City> = {
    items: [
      {
        ...AngularMaterialTableActionsUtils.detailDefault(),
        action: city => this.navigateDetail(city)
      },
      {
        ...AngularMaterialTableActionsUtils.deleteDefault(),
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
    private readonly angularMaterialDialogConfirmationService: AngularMaterialDialogConfirmationService
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

    this.cityService.delete(city.id).subscribe(() => {
      this.notificationService.success(`Cidade ${city.nome} excluída com sucesso!`);
      this.getCities();
    });
  }

  private getCities(): void {
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
