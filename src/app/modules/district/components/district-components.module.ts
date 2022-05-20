import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CityComponentsModule } from '../../city/components/city-components.module';
import { CityDirectivesModule } from '../../city/directives/city-directives.module';
import { DistrictAdvancedSearchComponent } from './advanced-search/district-advanced-search.component';
import { DistrictFormDetailComponent } from './form-detail/district-form-detail.component';
import { DistrictFormNewComponent } from './form-new/district-form-new.component';

@NgModule({
  declarations: [
    DistrictFormNewComponent,
    DistrictFormDetailComponent,
    DistrictAdvancedSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    CityComponentsModule,
    CityDirectivesModule
  ],
  exports: [
    DistrictFormNewComponent,
    DistrictFormDetailComponent,
    DistrictAdvancedSearchComponent
  ]
})
export class DistrictComponentsModule { }
