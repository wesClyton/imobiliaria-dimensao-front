import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UploadImageModule } from '../../../shared/components/upload-image/upload-image.module';
import { DirectivesModule } from '../../../shared/directives/directives.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { CityDirectivesModule } from '../../city/directives/city-directives.module';
import { AnnouncementDirectivesModule } from '../directives/announcement-directives.module';
import { AnnouncementAdvancedSearchComponent } from './advanced-search/announcement-advanced-search.component';
import { AnnouncementFormDetailComponent } from './form-detail/announcement-form-detail.component';
import { AnnouncementFormNewComponent } from './form-new/announcement-form-new.component';
import { AnnouncementImageOrderComponent } from './order/announcement-image-order.component';

@NgModule({
  declarations: [
    AnnouncementFormNewComponent,
    AnnouncementFormDetailComponent,
    AnnouncementAdvancedSearchComponent,
    AnnouncementImageOrderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    PipesModule,
    MatSlideToggleModule,
    UploadImageModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    AnnouncementDirectivesModule,
    CityDirectivesModule,
    DirectivesModule,
    MatDialogModule,
    DragDropModule
  ],
  exports: [
    AnnouncementFormNewComponent,
    AnnouncementFormDetailComponent,
    AnnouncementAdvancedSearchComponent,
    AnnouncementImageOrderComponent
  ]
})
export class AnnouncementComponentsModule { }
