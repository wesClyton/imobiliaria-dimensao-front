import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CrudActionsModule } from '../../../shared/components/crud-actions/crud-actions.module';
import { DialogConfirmationModule } from '../../../shared/components/dialog-confirmation/dialog-confirmation.module';
import { TableModule } from '../../../shared/components/table/table.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { AuthPipesModule } from '../../auth/pipes/auth-pipes.module';
import { UserComponentsModule } from '../components/user-components.module';
import { UserAccountComponent } from './account/user-account.component';
import { UserDetailComponent } from './detail/user-detail.component';
import { UserListComponent } from './list/user-list.component';
import { UserNewComponent } from './new/user-new.component';

@NgModule({
  declarations: [
    UserAccountComponent,
    UserDetailComponent,
    UserListComponent,
    UserNewComponent
  ],
  imports: [
    CommonModule,
    UserComponentsModule,
    CrudActionsModule,
    TableModule,
    DialogConfirmationModule,
    PipesModule,
    AuthPipesModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    UserAccountComponent,
    UserDetailComponent,
    UserListComponent,
    UserNewComponent
  ]
})
export class UserPagesModule { }
