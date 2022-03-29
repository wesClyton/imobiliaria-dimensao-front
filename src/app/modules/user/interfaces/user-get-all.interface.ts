import { ApiPagination } from '../../../shared/interfaces/api-pagination.interface';
import { User } from './user.interface';

export interface UserGetAll extends ApiPagination {
  data: Array<User>;
}
