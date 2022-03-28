import { ModuleConfig } from '../shared/interfaces/module-config.interface';

const PATH: string = 'panel-admin';

export const PANEL_ADMIN_CONFIG: ModuleConfig = {
  name: 'Painel Admin',
  namePlural: 'Painel Admin',
  path: PATH,
  pathApiSingle: '',
  pathApiPlural: '',
  pathFront: `/${PATH}`
};
