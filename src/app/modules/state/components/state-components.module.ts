import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { StateFormDetailComponent } from './form-detail/state-form-detail.component';
import { StateFormNewComponent } from './form-new/state-form-new.component';

@NgModule({
  declarations: [
    StateFormNewComponent,
    StateFormDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatSelectModule
  ],
  exports: [
    StateFormNewComponent,
    StateFormDetailComponent
  ]
})
export class StateComponentsModule { }
