import { environment } from '../../../environments/environment';
import { ModuleConfig } from '../../shared/interfaces/module-config.interface';

const PATH: string = 'characteristics';

export const CHARACTERISTICS_CONFIG: ModuleConfig = {
  name: 'Característica',
  namePlural: 'Características',
  path: PATH,
  pathApiSingle: `${environment.api}/caracteristica`,
  pathApiPlural: `${environment.api}/caracteristicas`,
  pathFront: `/${PATH}`
};
