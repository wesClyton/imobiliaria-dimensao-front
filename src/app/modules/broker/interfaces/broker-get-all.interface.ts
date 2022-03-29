import { ApiPagination } from '../../../shared/interfaces/api-pagination.interface';
import { Broker } from './broker.interface';

export interface BrokerGetAll extends ApiPagination {
  readonly data: Array<Broker>;
}
