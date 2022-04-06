import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { StateBrDirectiveModule } from '../../../shared/components/state-br/directives/state-br-directive.module';
import { StateDirectivesModule } from '../directives/state-directives.module';
import { StateAdvancedSearchComponent } from './advanced-search/state-advanced-search.component';
import { StateFormDetailComponent } from './form-detail/state-form-detail.component';
import { StateFormNewComponent } from './form-new/state-form-new.component';

@NgModule({
  declarations: [
    StateFormNewComponent,
    StateFormDetailComponent,
    StateAdvancedSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatSelectModule,
    StateBrDirectiveModule,
    MatButtonModule,
    MatInputModule,
    StateDirectivesModule
  ],
  exports: [
    StateFormNewComponent,
    StateFormDetailComponent,
    StateAdvancedSearchComponent
  ]
})
export class StateComponentsModule { }
