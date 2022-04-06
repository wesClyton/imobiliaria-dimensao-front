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
import { BannerAdvancedSearchComponent } from './advanced-search/banner-advanced-search.component';
import { BannerFormDetailComponent } from './form-detail/banner-form-detail.component';
import { BannerFormNewComponent } from './form-new/banner-form-new.component';

@NgModule({
  declarations: [
    BannerFormNewComponent,
    BannerFormDetailComponent,
    BannerAdvancedSearchComponent
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
    BannerFormNewComponent,
    BannerFormDetailComponent,
    BannerAdvancedSearchComponent
  ]
})
export class BannerComponentsModule { }
