import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CrudActionsModule } from '../../../shared/components/crud-actions/crud-actions.module';
import { DialogConfirmationModule } from '../../../shared/components/dialog-confirmation/dialog-confirmation.module';
import { TableModule } from '../../../shared/components/table/table.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { EnterpriseComponentsModule } from '../components/enterprise-components.module';
import { EnterpriseDetailComponent } from './detail/enterprise-detail.component';
import { EnterpriseListComponent } from './list/enterprise-list.component';
import { EnterpriseNewComponent } from './new/enterprise-new.component';

@NgModule({
  declarations: [
    EnterpriseListComponent,
    EnterpriseNewComponent,
    EnterpriseDetailComponent
  ],
  imports: [
    CommonModule,
    EnterpriseComponentsModule,
    CrudActionsModule,
    TableModule,
    DialogConfirmationModule,
    MatButtonModule,
    MatIconModule,
    PipesModule
  ],
  exports: [
    EnterpriseListComponent,
    EnterpriseNewComponent,
    EnterpriseDetailComponent
  ]
})
export class EnterprisePagesModule { }
