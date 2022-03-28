import { environment } from '../../../environments/environment';
import { ModuleConfig } from '../../shared/interfaces/module-config.interface';

interface Config extends ModuleConfig {
  readonly keySession: string;
}

const PATH: string = 'autenticacao';

export const AUTH_CONFIG: Config = {
  name: 'Autenticação',
  namePlural: 'Autenticação',
  path: PATH,
  pathApiSingle: environment.api,
  pathApiPlural: environment.api,
  pathFront: `/${PATH}`,
  keySession: 'app-session'
};
