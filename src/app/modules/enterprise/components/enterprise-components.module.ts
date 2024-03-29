import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UploadImageModule } from '../../../shared/components/upload-image/upload-image.module';
import { DirectivesModule } from '../../../shared/directives/directives.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { CityComponentsModule } from '../../city/components/city-components.module';
import { CityDirectivesModule } from '../../city/directives/city-directives.module';
import { EnterpriseAdvancedSearchComponent } from './advanced-search/enterprise-advanced-search.component';
import { EnterpriseFormDetailComponent } from './form-detail/enterprise-form-detail.component';
import { EnterpriseFormNewComponent } from './form-new/enterprise-form-new.component';
import { EnterpriseOrderComponent } from './order/enterprise-order.component';

@NgModule({
  declarations: [
    EnterpriseFormNewComponent,
    EnterpriseFormDetailComponent,
    EnterpriseAdvancedSearchComponent,
    EnterpriseOrderComponent
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
    MatSelectModule,
    DirectivesModule,
    CityComponentsModule,
    CityDirectivesModule,
    MatDialogModule,
    DragDropModule
  ],
  exports: [
    EnterpriseFormNewComponent,
    EnterpriseFormDetailComponent,
    EnterpriseAdvancedSearchComponent,
    EnterpriseOrderComponent
  ]
})
export class EnterpriseComponentsModule { }
