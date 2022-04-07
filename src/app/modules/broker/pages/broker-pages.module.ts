import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CrudActionsModule } from '../../../shared/components/crud-actions/crud-actions.module';
import { DialogConfirmationModule } from '../../../shared/components/dialog-confirmation/dialog-confirmation.module';
import { TableModule } from '../../../shared/components/table/table.module';
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
    TableModule,
    DialogConfirmationModule,
    MatButtonModule,
    MatIconModule,
    PipesModule
  ],
  exports: [
    BrokerListComponent,
    BrokerNewComponent,
    BrokerDetailComponent
  ]
})
export class BrokerPagesModule { }
