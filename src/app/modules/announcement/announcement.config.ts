import { environment } from '../../../environments/environment';
import { ModuleConfig } from '../../shared/interfaces/module-config.interface';

const PATH: string = 'announcements';

export const ANNOUNCEMENT_CONFIG: ModuleConfig = {
  name: 'Anúncio',
  namePlural: 'Anúncios',
  path: PATH,
  pathApiSingle: `${environment.api}/anuncio`,
  pathApiPlural: `${environment.api}/anuncios`,
  pathFront: `/${PATH}`
};
