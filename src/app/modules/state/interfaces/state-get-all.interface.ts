import { ApiPagination } from '../../../shared/interfaces/api-pagination.interface';
import { StateGetById } from './state-get-by-id.interface';

export interface StateGetAll extends ApiPagination {
  data: Array<StateGetById>;
}
