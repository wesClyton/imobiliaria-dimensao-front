import { QueryList } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatColumnDef, MatTable } from '@angular/material/table';

export interface Table<T> {
  readonly table: MatTable<T>;
  readonly tableSort: MatSort;
  readonly tableColumnDefs: QueryList<MatColumnDef>;
  tableFilterInputText(event: KeyboardEvent): void;
}
