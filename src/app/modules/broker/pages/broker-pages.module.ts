import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialDialogConfirmationModule } from '../../../shared/angular-material/dialog-confirmation/angular-material-dialog-confirmation.module';
import { AngularMaterialTableModule } from '../../../shared/angular-material/table/angular-material-table.module';
import { CrudActionsModule } from '../../../shared/components/crud-actions/crud-actions.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { BrokerComponentsModule } from '../components/broker-components.module';
import { BrokerDetailComponent } from './detail/broker-detail.component';
import { BrokerListComponent } from './list/broker-list.component';
import { BrokerNewComponent } from './new/broker-new.component';

@NgModule({
  declarations: [
    BrokerListComponent,
    BrokerNewComponent,
    BrokerDetailComponent
  ],
  imports: [
    CommonModule,
    BrokerComponentsModule,
    CrudActionsModule,
    AngularMaterialTableModule,
    AngularMaterialDialogConfirmationModule,
    PipesModule
  ],
  exports: [
    BrokerListComponent,
    BrokerNewComponent,
    BrokerDetailComponent
  ]
})
export class BrokerPagesModule { }
