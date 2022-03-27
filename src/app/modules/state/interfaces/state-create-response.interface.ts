import { ApiCreateUpdateAt } from '../../../shared/interfaces/api-create-update-at.interface';
import { State } from './state.interface';

export interface StateCreateResponse extends State, ApiCreateUpdateAt { }
