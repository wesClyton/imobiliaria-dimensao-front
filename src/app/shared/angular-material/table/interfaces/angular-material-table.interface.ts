import { QueryList } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatColumnDef, MatTable } from '@angular/material/table';

export interface AngularMaterialTable<T> {
  readonly table: MatTable<T>;
  readonly tablePaginator: MatPaginator;
  readonly tableSort: MatSort;
  readonly tableColumnDefs: QueryList<MatColumnDef>;
  tableFilterInputText(event: KeyboardEvent): void;
}
