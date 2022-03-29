import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialDialogConfirmationModule } from '../../../shared/angular-material/dialog-confirmation/angular-material-dialog-confirmation.module';
import { AngularMaterialTableModule } from '../../../shared/angular-material/table/angular-material-table.module';
import { CrudActionsModule } from '../../../shared/components/crud-actions/crud-actions.module';
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
    AngularMaterialTableModule,
    AngularMaterialDialogConfirmationModule,
    PipesModule,
    AuthPipesModule
  ],
  exports: [
    UserAccountComponent,
    UserDetailComponent,
    UserListComponent,
    UserNewComponent
  ]
})
export class UserPagesModule { }
