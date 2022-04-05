import { AnnouncementStateProperty } from '../enums/announcement-state-property.enum';

export class AnnouncementStatePropertyLabel {

  public static getAll(): { [key in AnnouncementStateProperty]: string } {
    return {
      EM_CONSTRUCAO: 'Em construção',
      NA_PLANTA: 'Na planta',
      PRONTO: 'Pronto'
    }
  }

  public static getByRole(type: AnnouncementStateProperty): string {
    return AnnouncementStatePropertyLabel.getAll()[type];
  }

}
