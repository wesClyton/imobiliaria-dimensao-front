import { AfterContentInit, AfterViewInit, Component, ContentChildren, Input, QueryList, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatColumnDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { AngularMaterialTableActionsItem } from './interfaces/angular-material-table-actions-item.interface';
import { AngularMaterialTableActions } from './interfaces/angular-material-table-actions.interface';
import { AngularMaterialTableInputs } from './interfaces/angular-material-table-inputs.interface';
import { AngularMaterialTable } from './interfaces/angular-material-table.interface';

@Component({
  selector: 'app-angular-material-table',
  templateUrl: './angular-material-table.component.html',
  styleUrls: ['./angular-material-table.component.scss']
})
export class AngularMaterialTableComponent<T>
  implements AfterViewInit, AfterContentInit, AngularMaterialTableInputs<T>, AngularMaterialTable<T> {

  @Input()
  public showAdvancedSearch = false;

  public showForm = false;

  @Input()
  public tableFilterInputTextPlaceholder = 'Informe o filtro';

  @Input()
  public tableDataSource!: MatTableDataSource<T>;

  @Input()
  public tableDisplayedColumns!: Array<string>;

  @Input()
  public tablePageSizeOptions = [10, 15, 25, 50, 100];

  @Input()
  public tableMessageNoData = 'Nenhum registro encontrado!';

  @Input()
  public tableActions?: AngularMaterialTableActions<T> | undefined;

  @ViewChild(MatTable, { static: true })
  public table!: MatTable<T>;

  @ViewChild(MatPaginator)
  public tablePaginator!: MatPaginator;

  @ViewChild(MatSort)
  public tableSort!: MatSort;

  @ContentChildren(MatColumnDef)
  public tableColumnDefs!: QueryList<MatColumnDef>;

  constructor() { }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.tablePaginator;
    this.tableDataSource.sort = this.tableSort;
    if (this.tableActions) {
      this.tableDisplayedColumns.push('actions');
    }
  }

  ngAfterContentInit(): void {
    this.tableColumnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
  }

  public tableFilterInputText(event: KeyboardEvent): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();

    if (this.tableDataSource.paginator) {
      this.tableDataSource.paginator.firstPage();
    }
  }

  public clickAction(actionItem: AngularMaterialTableActionsItem<T>, type: T): void {
    if (actionItem.action) {
      actionItem?.action(type);
    }
  }

  public toggleAdvancedSearch(): void {
    this.showForm = !this.showForm;
  }

}
