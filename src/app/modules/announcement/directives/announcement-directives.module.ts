import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnnouncementTypeOptionSelectDirective } from './announcement-asd-option-select/announcement-type-option-select.directive';
import { AnnouncementStatePropertyOptionSelectDirective } from './announcement-state-property-option-select/announcement-state-property-option-select.directive';

@NgModule({
  declarations: [
    AnnouncementTypeOptionSelectDirective,
    AnnouncementStatePropertyOptionSelectDirective
  ],
  imports: [CommonModule],
  exports: [
    AnnouncementTypeOptionSelectDirective,
    AnnouncementStatePropertyOptionSelectDirective
  ]
})
export class AnnouncementDirectivesModule { }
