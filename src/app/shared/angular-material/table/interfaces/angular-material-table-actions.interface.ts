import { AngularMaterialTableActionsItem } from './angular-material-table-actions-item.interface';

export interface AngularMaterialTableActions<T> {
  items: Array<AngularMaterialTableActionsItem<T>>
}
