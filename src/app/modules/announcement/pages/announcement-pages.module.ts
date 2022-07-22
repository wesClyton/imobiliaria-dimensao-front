import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CrudActionsModule } from '../../../shared/components/crud-actions/crud-actions.module';
import { DialogConfirmationModule } from '../../../shared/components/dialog-confirmation/dialog-confirmation.module';
import { TableModule } from '../../../shared/components/table/table.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { AnnouncementComponentsModule } from '../components/announcement-components.module';
import { AnnouncementPipesModule } from '../pipes/announcement-pipes.module';
import { AnnouncementDetailComponent } from './detail/announcement-detail.component';
import { AnnouncementListComponent } from './list/announcement-list.component';
import { AnnouncementNewComponent } from './new/announcement-new.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    AnnouncementListComponent,
    AnnouncementNewComponent,
    AnnouncementDetailComponent
  ],
  imports: [
    CommonModule,
    AnnouncementComponentsModule,
    CrudActionsModule,
    MatButtonModule,
    TableModule,
    DialogConfirmationModule,
    PipesModule,
    AnnouncementPipesModule
  ],
  exports: [
    AnnouncementListComponent,
    AnnouncementNewComponent,
    AnnouncementDetailComponent
  ]
})
export class AnnouncementPagesModule { }
