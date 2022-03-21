import { ModuleConfig } from '../shared/interfaces/module-config.interface';

const PATH: string = 'painel-admin';

export const PAINEL_ADMIN_CONFIG: ModuleConfig = {
  nome: 'Painel Admin',
  nomePlural: 'Painel Admin',
  path: PATH,
  pathApi: '',
  pathFront: `/${PATH}`
};
