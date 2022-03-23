import { environment } from '../../../environments/environment';
import { ModuleConfig } from '../../shared/interfaces/module-config.interface';

const PATH: string = 'brokers';

export const BROKER_CONFIG: ModuleConfig = {
  name: 'Corretor',
  namePlural: 'Corretores',
  path: PATH,
  pathApi: environment.api,
  pathFront: `/${PATH}`
};
