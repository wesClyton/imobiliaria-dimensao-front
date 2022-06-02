import { ApiPagination } from '../../../shared/interfaces/api-pagination.interface';
import { Enterprise } from './enterprise.interface';

export interface EnterpriseGetAll extends ApiPagination {
  readonly data: Array<Enterprise>;
}
