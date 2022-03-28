import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { StateComponentsModule } from '../../state/components/state-components.module';
import { CityFormDetailComponent } from './form-detail/city-form-detail.component';
import { CityFormNewComponent } from './form-new/city-form-new.component';

@NgModule({
  declarations: [
    CityFormNewComponent,
    CityFormDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatSelectModule,
    MatInputModule,
    StateComponentsModule
  ],
  exports: [
    CityFormNewComponent,
    CityFormDetailComponent
  ]
})
export class CityComponentsModule { }
