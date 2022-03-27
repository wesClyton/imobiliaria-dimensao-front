import { ApiPagination } from '../../../shared/interfaces/api-pagination.interface';
import { State } from './state.interface';

export interface StateGetAll extends ApiPagination {
  readonly data: Array<State>;
}
