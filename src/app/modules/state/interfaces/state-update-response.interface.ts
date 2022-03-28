import { State } from './state.interface';

export interface StateUpdateResponse extends State {
  readonly id: string;
  readonly nome: string;
  readonly uf: string;
}
