import { ApiPagination } from '../../../shared/interfaces/api-pagination.interface';
import { Banner } from './banner-create.interface';

export interface BannerGetAll extends ApiPagination {
  readonly data: Array<Banner>;
}
