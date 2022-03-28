import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialDialogConfirmationModule } from '../../../shared/angular-material/dialog-confirmation/angular-material-dialog-confirmation.module';
import { AngularMaterialTableModule } from '../../../shared/angular-material/table/angular-material-table.module';
import { CrudActionsModule } from '../../../shared/components/crud-actions/crud-actions.module';
import { StateComponentsModule } from '../components/state-components.module';
import { StateDetailComponent } from './detail/state-detail.component';
import { StateListComponent } from './list/state-list.component';
import { StateNewComponent } from './new/state-new.component';

@NgModule({
  declarations: [
    StateListComponent,
    StateNewComponent,
    StateDetailComponent
  ],
  imports: [
    CommonModule,
    StateComponentsModule,
    ReactiveFormsModule,
    CrudActionsModule,
    AngularMaterialTableModule,
    AngularMaterialDialogConfirmationModule
  ],
  exports: [
    StateListComponent,
    StateNewComponent,
    StateDetailComponent
  ]
})
export class StatePagesModule { }
