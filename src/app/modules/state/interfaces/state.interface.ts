import { Entity } from '../../../shared/interfaces/entity.interface';
import { StateCreate } from './state-create.interface';

export interface State extends Entity, StateCreate { }
