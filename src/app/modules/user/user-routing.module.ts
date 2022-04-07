import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.guard';
import { Role } from '../auth/enums/role.enum';
import { RoleGuard } from '../auth/guards/auth-role.guard';
import { AllowedRoles } from '../auth/interfaces/allowed-role.interface';
import { UserAccountComponent } from './pages/account/user-account.component';
import { UserDetailComponent } from './pages/detail/user-detail.component';
import { UserListComponent } from './pages/list/user-list.component';
import { UserNewComponent } from './pages/new/user-new.component';
import { UserGetAllResolver } from './resolvers/user-get-all.resolver';
import { UserGeByIdResolver } from './resolvers/user-get-by-id.resolver';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    resolve: {
      userGetAll: UserGetAllResolver,
    }
  },
  {
    path: 'new',
    canDeactivate: [CanDeactivateGuard],
    canActivate: [RoleGuard],
    data: {
      roles: [Role.Admin]
    } as AllowedRoles,
    component: UserNewComponent
  },
  {
    path: 'detail/:id',
    canDeactivate: [CanDeactivateGuard],
    resolve: {
      user: UserGeByIdResolver
    },
    component: UserDetailComponent
  },
  {
    path: 'account/:id',
    canDeactivate: [CanDeactivateGuard],
    resolve: {
      user: UserGeByIdResolver
    },
    component: UserAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
