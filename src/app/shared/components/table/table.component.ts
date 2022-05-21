import { AfterContentInit, AfterViewInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatColumnDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { TableActionsItem } from './interfaces/table-actions-item.interface';
import { TableActions } from './interfaces/table-actions.interface';
import { TableInputs } from './interfaces/table-inputs.interface';
import { Table } from './interfaces/table.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T>
  implements AfterViewInit, AfterContentInit, TableInputs<T>, Table<T> {

  @Input()
  public tableShowAdvancedSearch = false;

  public tableShowForm = false;

  @Input()
  public tableFilterInputTextPlaceholder = 'Informe o filtro';

  @Input()
  public tableDataSource!: MatTableDataSource<T>;

  @Input()
  public tableDataSourceLength!: number;

  @Input()
  public tableDisplayedColumns!: Array<string>;

  @Input()
  public tablePageSizeOptions = [10, 15, 25, 50, 100];

  @Input()
  public tableMessageNoData = 'Nenhum registro encontrado!';

  @Input()
  public tableActions?: TableActions<T> | undefined;

  @ViewChild(MatTable, { static: true })
  public table!: MatTable<T>;

  @ViewChild(MatSort)
  public tableSort!: MatSort;

  @ContentChildren(MatColumnDef)
  public tableColumnDefs!: QueryList<MatColumnDef>;

  @Input()
  public tableShowActions = true;

  @Output()
  public tableMenuActionsClicked = new EventEmitter<T>();

  @Output()
  public tableOnChangePaginator = new EventEmitter<PageEvent>();

  constructor() { }

  ngAfterViewInit(): void {
    this.tableDataSource.sort = this.tableSort;
    if (this.tableShowActions) {
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

  public clickAction(actionItem: TableActionsItem<T>, type: T): void {
    if (actionItem.action) {
      actionItem?.action(type);
    }
  }

  public toggleAdvancedSearch(): void {
    this.tableShowForm = !this.tableShowForm;
  }

  public actionsClick(type: T): void {
    this.tableMenuActionsClicked.emit(type);
  }

  public changePaginator(event: PageEvent): void {
    this.tableOnChangePaginator.emit(event);
  }

}
