import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UploadPhotoItemComponent } from './item/upload-photo-item.component';
import { UpdaloadPhotoComponent } from './upload-photo.component';

@NgModule({
  declarations: [
    UpdaloadPhotoComponent,
    UploadPhotoItemComponent
  ],
  imports: [
    CommonModule,
    ImageCropperModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [UpdaloadPhotoComponent]
})
export class UpdaloadPhotoModule {}
