import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UpdaloadPhotoModule } from '../../../shared/components/upload-photo/upload-photo.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { BrokerFormDetailComponent } from './form-detail/broker-form-detail.component';
import { BrokerFormNewComponent } from './form-new/broker-form-new.component';

@NgModule({
  declarations: [
    BrokerFormNewComponent,
    BrokerFormDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    PipesModule,
    MatSlideToggleModule,
    UpdaloadPhotoModule
  ],
  exports: [
    BrokerFormNewComponent,
    BrokerFormDetailComponent
  ]
})
export class BrokerComponentsModule { }
