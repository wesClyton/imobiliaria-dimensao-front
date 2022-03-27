import { MatTableDataSource } from '@angular/material/table';
import { AngularMaterialTableActions } from './angular-material-table-actions.interface';

export interface AngularMaterialTableInputs<T> {
  tableDataSource: MatTableDataSource<T>;
  tableDisplayedColumns: Array<string>;
  tablePageSizeOptions?: Array<number>;
  tableMessageNoData?: string;
  tableFilterInputTextPlaceholder?: string;
  tableActions?: AngularMaterialTableActions<T>;
}
