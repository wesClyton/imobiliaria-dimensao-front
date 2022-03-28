import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialDialogConfirmationModule } from '../../../shared/angular-material/dialog-confirmation/angular-material-dialog-confirmation.module';
import { AngularMaterialTableModule } from '../../../shared/angular-material/table/angular-material-table.module';
import { CrudActionsModule } from '../../../shared/components/crud-actions/crud-actions.module';
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
    ReactiveFormsModule,
    CrudActionsModule,
    CityComponentsModule,
    AngularMaterialTableModule,
    AngularMaterialDialogConfirmationModule
  ],
  exports: [
    CityNewComponent,
    CityListComponent,
    CityDetailComponent
  ]
})
export class CityPagesModule { }
