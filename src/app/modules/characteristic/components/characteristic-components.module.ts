import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CharacteristicDirectivesModule } from '../directives/characteristic-directives.module';
import { CharacteristicAdvancedSearchComponent } from './advanced-search/characteristic-advanced-search.component';
import { CharacteristicFormDetailComponent } from './form-detail/characteristic-form-detail.component';
import { CharacteristicFormNewComponent } from './form-new/characteristic-form-new.component';

@NgModule({
  declarations: [
    CharacteristicFormNewComponent,
    CharacteristicFormDetailComponent,
    CharacteristicAdvancedSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    CharacteristicDirectivesModule
  ],
  exports: [
    CharacteristicFormNewComponent,
    CharacteristicFormDetailComponent,
    CharacteristicAdvancedSearchComponent
  ]
})
export class CharacteristicComponentsModule { }
