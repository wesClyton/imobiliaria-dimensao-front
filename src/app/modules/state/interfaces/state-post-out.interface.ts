import { ApiCreateUpdateAt } from '../../../shared/interfaces/api-create-update-at.interface';
import { StateGetById } from './state-get-by-id.interface';

export interface StatePostOut extends StateGetById, ApiCreateUpdateAt { }
