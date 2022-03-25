import { StateGetById } from './state-get-by-id.interface';

export interface StatePostOut extends StateGetById {
  createdAt: Date;
  updatedAt: Date;
}
