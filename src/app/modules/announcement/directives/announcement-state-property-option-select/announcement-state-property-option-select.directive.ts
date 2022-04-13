import { Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { AnnouncementStateProperty as AnnouncementStatePropertyEnum } from '../../enums/announcement-state-property.enum';
import { AnnouncementStateProperty } from '../../interfaces/announcement-state-property.interface';
import { AnnouncementStatePropertyPipe } from '../../pipes/announcement-state-property/announcement-state-property.pipe';
import { AnnouncementStatePropertyLabel } from '../../utils/announcement-state-property.util';

@Directive({
  selector: '[appAnnouncementStatePropertyOptionSelect]',
  providers: [AnnouncementStatePropertyPipe]
})
export class AnnouncementStatePropertyOptionSelectDirective implements OnInit {

  @Output()
  public readonly dataFinded = new EventEmitter<Array<AnnouncementStateProperty>>();

  constructor(
    private readonly announcementStatePropertyPipe: AnnouncementStatePropertyPipe
  ) { }

  ngOnInit(): void {
    const announcementTypes = new Array<AnnouncementStateProperty>();
    Object.keys(AnnouncementStatePropertyLabel.getAll()).forEach(key => {
      announcementTypes.push({
        name: this.announcementStatePropertyPipe.transform(key as never),
        value: key as AnnouncementStatePropertyEnum
      });
    })
    this.dataFinded.emit(announcementTypes);
  }

}

