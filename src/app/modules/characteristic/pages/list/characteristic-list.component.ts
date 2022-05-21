import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
import { CharacteristicGetAll } from '../../interfaces/characteristic-get-all.interface';
import { Characteristic } from '../../interfaces/characteristic.interface';
import { CharacteristicService } from '../../services/characteristic.service';

@Component({
  selector: 'app-characteristic-list',
  templateUrl: 'characteristic-list.component.html'
})
export class CharacteristicListComponent implements OnInit, TableInputs<Characteristic>, CrudActionNew, CrudActionBack {

  public characteristicGetAll!: CharacteristicGetAll;

  public tableDataSource!: MatTableDataSource<Characteristic>;

  public readonly tableDisplayedColumns = ['nome', 'tipo'];

  public readonly tableShowActions = this.authService.isAdmin || this.authService.isAutor;

  public readonly tableActions: TableActions<Characteristic> = {
    items: [
      {
        ...TableActionsUtils.detailDefault(),
        action: characteristic => this.navigateDetail(characteristic)
      },
      {
        ...TableActionsUtils.deleteDefault(),
        action: characteristic => this.delete(characteristic)
      }
    ]
  };

  public readonly newShow = this.authService.isAdmin || this.authService.isAutor;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly characteristicService: CharacteristicService,
    private readonly notificationService: NotificationService,
    private readonly loadingService: LoadingService,
    private readonly angularMaterialDialogConfirmationService: DialogConfirmationService,
    private readonly authService: AuthService
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

    this.loadingService.show();

    this.characteristicService
      .delete(characteristic.id)
      .pipe(
        take(1),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(() => {
        this.notificationService.success(`Característica ${characteristic.nome} excluída com sucesso!`);
        this.getCharacteristics();
      });
  }

  public getCharacteristics(queryFilters: Array<QueryFilterParam> = new Array<QueryFilterParam>()): void {
    this.characteristicService.queryFilterRemove();
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

  public changePaginator(event: PageEvent): void {
    const queryFilters = new Array<QueryFilterParam>();

    queryFilters.push(
      {
        field: 'page',
        value: event.pageIndex + 1
      },
      {
        field: 'take',
        value: event.pageSize
      }
    );

    this.getCharacteristics(queryFilters);
  }

}
