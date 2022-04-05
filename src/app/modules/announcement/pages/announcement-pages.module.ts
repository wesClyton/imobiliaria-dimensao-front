import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AngularMaterialDialogConfirmationModule } from '../../../shared/angular-material/dialog-confirmation/angular-material-dialog-confirmation.module';
import { AngularMaterialTableModule } from '../../../shared/angular-material/table/angular-material-table.module';
import { CrudActionsModule } from '../../../shared/components/crud-actions/crud-actions.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { AnnouncementComponentsModule } from '../components/announcement-components.module';
import { AnnouncementPipesModule } from '../pipes/announcement-pipes.module';
import { AnnouncementDetailComponent } from './detail/announcement-detail.component';
import { AnnouncementListComponent } from './list/announcement-list.component';
import { AnnouncementNewComponent } from './new/announcement-new.component';

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
    AngularMaterialTableModule,
    AngularMaterialDialogConfirmationModule,
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
