import { TableActionsItem } from './table-actions-item.interface';

export interface TableActions<T> {
  items: Array<TableActionsItem<T>>
}
