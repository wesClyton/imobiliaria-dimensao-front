import { environment } from '../../../environments/environment';
import { ModuleConfig } from '../../shared/interfaces/module-config.interface';

interface Config extends ModuleConfig {
  readonly keySession: string;
}

const PATH: string = 'autenticacao';

export const AUTH_CONFIG: Config = {
  nome: 'Autenticação',
  nomePlural: 'Autenticação',
  path: PATH,
  pathApi: environment.api,
  pathFront: `/${PATH}`,
  keySession: 'app-session'
};
