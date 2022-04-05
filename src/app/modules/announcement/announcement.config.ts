import { environment } from '../../../environments/environment';
import { ModuleConfig } from '../../shared/interfaces/module-config.interface';

interface Config extends ModuleConfig {
  readonly pathUpload: string;
}

const PATH: string = 'announcements';

export const ANNOUNCEMENT_CONFIG: Config = {
  name: 'Anúncio',
  namePlural: 'Anúncios',
  path: PATH,
  pathApiSingle: `${environment.api}/anuncio`,
  pathApiPlural: `${environment.api}/anuncios`,
  pathFront: `/${PATH}`,
  pathUpload: `${environment.api}/anuncioUpload`
};
