import { environment } from '../../../environments/environment';
import { ModuleConfig } from '../../shared/interfaces/module-config.interface';

const PATH: string = 'states';

export const STATE_CONFIG: ModuleConfig = {
  name: 'Estado',
  namePlural: 'Estados',
  path: PATH,
  pathApi: `${environment.api}/estados`,
  pathFront: `/${PATH}`
};
