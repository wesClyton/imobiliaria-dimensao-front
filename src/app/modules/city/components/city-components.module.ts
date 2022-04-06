import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { StateComponentsModule } from '../../state/components/state-components.module';
import { StateDirectivesModule } from '../../state/directives/state-directives.module';
import { CityAdvancedSearchComponent } from './advanced-search/city-advanced-search.component';
import { CityFormDetailComponent } from './form-detail/city-form-detail.component';
import { CityFormNewComponent } from './form-new/city-form-new.component';

@NgModule({
  declarations: [
    CityFormNewComponent,
    CityFormDetailComponent,
    CityAdvancedSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    StateComponentsModule,
    StateDirectivesModule
  ],
  exports: [
    CityFormNewComponent,
    CityFormDetailComponent,
    CityAdvancedSearchComponent
  ]
})
export class CityComponentsModule { }
