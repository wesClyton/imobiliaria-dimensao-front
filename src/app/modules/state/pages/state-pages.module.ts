import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CrudActionsModule } from '../../../shared/components/crud-actions/crud-actions.module';
import { DialogConfirmationModule } from '../../../shared/components/dialog-confirmation/dialog-confirmation.module';
import { TableModule } from '../../../shared/components/table/table.module';
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
    CrudActionsModule,
    TableModule,
    DialogConfirmationModule
  ],
  exports: [
    StateListComponent,
    StateNewComponent,
    StateDetailComponent
  ]
})
export class StatePagesModule { }
