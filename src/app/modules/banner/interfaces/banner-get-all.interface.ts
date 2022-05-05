import { ApiPagination } from '../../../shared/interfaces/api-pagination.interface';
import { BannerCreate } from './banner-create.interface';

export interface BannerGetAll extends ApiPagination {
  readonly data: Array<BannerCreate>;
}
