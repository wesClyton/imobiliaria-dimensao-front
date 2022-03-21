import { ModuleConfig } from '../../shared/interfaces/module-config.interface';

interface Config extends ModuleConfig {
  readonly keyToken: string;
}

const PATH: string = 'autenticacao';

export const AUTH_CONFIG: Config = {
  nome: 'Autenticação',
  nomePlural: 'Autenticação',
  path: PATH,
  pathApi: '',
  pathFront: `/${PATH}`,
  keyToken: 'jwt-token'
};
