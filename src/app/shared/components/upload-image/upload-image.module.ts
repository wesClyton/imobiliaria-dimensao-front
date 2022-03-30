import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UploadImageItemComponent } from './item/upload-image-item.component';
import { UploadImageComponent } from './upload-image.component';

@NgModule({
  declarations: [
    UploadImageComponent,
    UploadImageItemComponent
  ],
  imports: [
    CommonModule,
    ImageCropperModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [UploadImageComponent]
})
export class UploadImageModule {}
