import { MatTableDataSource } from '@angular/material/table';
import { TableActions } from './table-actions.interface';

export interface TableInputs<T> {
  tableDataSource: MatTableDataSource<T>;
  tableDisplayedColumns: Array<string>;
  tablePageSizeOptions?: Array<number>;
  tableMessageNoData?: string;
  tableFilterInputTextPlaceholder?: string;
  tableActions?: TableActions<T>;
}
