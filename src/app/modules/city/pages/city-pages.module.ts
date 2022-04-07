import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CrudActionsModule } from '../../../shared/components/crud-actions/crud-actions.module';
import { DialogConfirmationModule } from '../../../shared/components/dialog-confirmation/dialog-confirmation.module';
import { TableModule } from '../../../shared/components/table/table.module';
import { CityComponentsModule } from '../components/city-components.module';
import { CityDetailComponent } from './detail/city-detail.component';
import { CityListComponent } from './list/city-list.component';
import { CityNewComponent } from './new/city-new.component';

@NgModule({
  declarations: [
    CityNewComponent,
    CityListComponent,
    CityDetailComponent
  ],
  imports: [
    CommonModule,
    CrudActionsModule,
    CityComponentsModule,
    TableModule,
    DialogConfirmationModule
  ],
  exports: [
    CityNewComponent,
    CityListComponent,
    CityDetailComponent
  ]
})
export class CityPagesModule { }
