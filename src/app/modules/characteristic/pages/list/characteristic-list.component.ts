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
import { QueryFilterParam } from '../../../../shared/services/http/query-filter/query-filter.interface';
import { UrlUtil } from '../../../../shared/utils/url.util';
import { CharacteristicGetAll } from '../../interfaces/characteristic-get-all.interface';
import { Characteristic } from '../../interfaces/characteristic.interface';
import { CharacteristicService } from '../../services/characteristic.service';

@Component({
  selector: 'app-characteristic-list',
  templateUrl: 'characteristic-list.component.html'
})
export class CharacteristicListComponent implements OnInit, AngularMaterialTableInputs<Characteristic>, CrudActionNew, CrudActionBack {

  private characteristicGetAll!: CharacteristicGetAll;

  public tableDataSource!: MatTableDataSource<Characteristic>;

  public tableDisplayedColumns = ['nome', 'tipo'];

  public tableActions: AngularMaterialTableActions<Characteristic> = {
    items: [
      {
        ...AngularMaterialTableActionsUtils.detailDefault(),
        action: characteristic => this.navigateDetail(characteristic)
      },
      {
        ...AngularMaterialTableActionsUtils.deleteDefault(),
        action: characteristic => this.delete(characteristic)
      }
    ]
  };

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly characteristicService: CharacteristicService,
    private readonly notificationService: NotificationService,
    private readonly loadingService: LoadingService,
    private readonly angularMaterialDialogConfirmationService: AngularMaterialDialogConfirmationService
  ) { }

  ngOnInit(): void {
    this.characteristicGetAll = this.activatedRoute.snapshot.data.characteristicGetAll;
    this.tableLoadContent(this.characteristicGetAll);
  }

  private tableLoadContent(characteristics: CharacteristicGetAll): void {
    this.tableDataSource = new MatTableDataSource(characteristics.data);
  }

  public navigateDetail(characteristic: Characteristic): void {
    this.router.navigate([`detail/${characteristic.id}`], { relativeTo: this.activatedRoute })
  }

  public crudActionBack(): void {
    this.router.navigateByUrl(UrlUtil.previusUrlAcessed);
  }

  public crudActionNew(): void {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute })
  }

  private async delete(characteristic: Characteristic): Promise<void> {
    const confirmation = await this.angularMaterialDialogConfirmationService?.confirm({
      message: `Realmente deseja excluir o Característica ${characteristic.nome}?`
    });
    if (!confirmation) {
      return;
    }

    this.characteristicService.delete(characteristic.id).subscribe(() => {
      this.notificationService.success(`Característica ${characteristic.nome} excluída com sucesso!`);
      this.getCharacteristics();
    });
  }

  public getCharacteristics(queryFilters: Array<QueryFilterParam> = new Array<QueryFilterParam>()): void {
    this.characteristicService.queryFilterAdd(queryFilters);

    this.loadingService.show();

    this.characteristicService
      .getAll()
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(characteristics => this.tableLoadContent(characteristics));
  }

}
