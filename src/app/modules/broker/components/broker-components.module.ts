import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UploadImageModule } from '../../../shared/components/upload-image/upload-image.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { BrokerAdvancedSearchComponent } from './advanced-search/broker-advanced-search.component';
import { BrokerFormDetailComponent } from './form-detail/broker-form-detail.component';
import { BrokerFormNewComponent } from './form-new/broker-form-new.component';

@NgModule({
  declarations: [
    BrokerFormNewComponent,
    BrokerFormDetailComponent,
    BrokerAdvancedSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    PipesModule,
    MatSlideToggleModule,
    UploadImageModule,
    MatButtonModule,
    MatSelectModule
  ],
  exports: [
    BrokerFormNewComponent,
    BrokerFormDetailComponent,
    BrokerAdvancedSearchComponent
  ]
})
export class BrokerComponentsModule { }
