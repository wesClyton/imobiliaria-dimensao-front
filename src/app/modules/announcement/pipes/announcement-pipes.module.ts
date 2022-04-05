import { NgModule } from '@angular/core';
import { AnnouncementStatePropertyPipe } from './announcement-state-property/announcement-state-property.pipe';
import { AnnouncementTypePipe } from './announcement-type/announcement-type.pipe';

@NgModule({
  declarations: [
    AnnouncementTypePipe,
    AnnouncementStatePropertyPipe,
  ],
  exports: [
    AnnouncementTypePipe
  ]
})
export class AnnouncementPipesModule {}
