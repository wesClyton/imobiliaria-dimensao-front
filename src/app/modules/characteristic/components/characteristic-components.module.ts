import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CharacteristicDirectivesModule } from '../directives/characteristic-directives.module';
import { CharacteristicFormDetailComponent } from './form-detail/characteristic-form-detail.component';
import { CharacteristicFormNewComponent } from './form-new/characteristic-form-new.component';

@NgModule({
  declarations: [
    CharacteristicFormNewComponent,
    CharacteristicFormDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatSelectModule,
    MatInputModule,
    CharacteristicDirectivesModule
  ],
  exports: [
    CharacteristicFormNewComponent,
    CharacteristicFormDetailComponent
  ]
})
export class CharacteristicComponentsModule { }
