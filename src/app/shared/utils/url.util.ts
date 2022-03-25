import { APP_CONFIG } from '../../app.config';
import { StorageService } from '../services/storage/storage.service';

export class UrlUtil {

  public static readonly keyPreviusUrlAcessed = 'previusUrlAcessed';

  public static get previusUrlAcessed(): string {
    const previusUrl = StorageService.localGetItem(UrlUtil.keyPreviusUrlAcessed) === window.location.pathname ?
      APP_CONFIG.pathFront :
      StorageService.localGetItem(UrlUtil.keyPreviusUrlAcessed);

    return previusUrl;
  }

}
