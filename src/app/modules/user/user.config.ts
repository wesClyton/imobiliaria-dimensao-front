import { environment } from '../../../environments/environment';
import { ModuleConfig } from '../../shared/interfaces/module-config.interface';

const PATH: string = 'users';

export const USER_CONFIG: ModuleConfig = {
  name: 'Usuário',
  namePlural: 'Usuários',
  path: PATH,
  pathApiSingle: `${environment.api}/usuario`,
  pathApiPlural: `${environment.api}/usuarios`,
  pathFront: `/${PATH}`
};
