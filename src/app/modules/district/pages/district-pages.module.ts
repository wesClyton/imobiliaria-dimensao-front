import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CrudActionsModule } from '../../../shared/components/crud-actions/crud-actions.module';
import { DialogConfirmationModule } from '../../../shared/components/dialog-confirmation/dialog-confirmation.module';
import { TableModule } from '../../../shared/components/table/table.module';
import { DistrictComponentsModule } from '../components/district-components.module';
import { DistrictDetailComponent } from './detail/district-detail.component';
import { DistrictListComponent } from './list/district-list.component';
import { DistrictNewComponent } from './new/district-new.component';

@NgModule({
  declarations: [
    DistrictNewComponent,
    DistrictListComponent,
    DistrictDetailComponent
  ],
  imports: [
    CommonModule,
    CrudActionsModule,
    DistrictComponentsModule,
    TableModule,
    DialogConfirmationModule
  ],
  exports: [
    DistrictNewComponent,
    DistrictListComponent,
    DistrictDetailComponent
  ]
})
export class DistrictPagesModule { }
