import { Pipe, PipeTransform } from '@angular/core';
import { AnnouncementStateProperty } from '../../enums/announcement-state-property.enum';
import { AnnouncementStatePropertyLabel } from '../../utils/announcement-state-property.util';

@Pipe({
  name: 'announcementStateProperty'
})
export class AnnouncementStatePropertyPipe implements PipeTransform {

  transform(stateProperty: AnnouncementStateProperty): string {
    return AnnouncementStatePropertyLabel.getByRole(stateProperty);
  }

}
