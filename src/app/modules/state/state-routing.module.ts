import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.guard';
import { Role } from '../auth/enums/role.enum';
import { RoleGuard } from '../auth/guards/auth-role.guard';
import { AllowedRoles } from '../auth/interfaces/allowed-role.interface';
import { StateDetailComponent } from './pages/detail/state-detail.component';
import { StateListComponent } from './pages/list/state-list.component';
import { StateNewComponent } from './pages/new/state-new.component';
import { StateGetAllResolver } from './resolvers/state-get-all.resolver';
import { StateGeByIdResolver } from './resolvers/state-get-by-id.resolver';

const routes: Routes = [
  {
    path: '',
    component: StateListComponent,
    resolve: {
      stateGetAll: StateGetAllResolver,
    }
  },
  {
    path: 'new',
    canDeactivate: [CanDeactivateGuard],
    canActivate: [RoleGuard],
    data: {
      roles: [Role.Admin, Role.Autor]
    } as AllowedRoles,
    component: StateNewComponent
  },
  {
    path: 'detail/:id',
    canDeactivate: [CanDeactivateGuard],
    resolve: {
      state: StateGeByIdResolver
    },
    canActivate: [RoleGuard],
    data: {
      roles: [Role.Admin, Role.Autor]
    } as AllowedRoles,
    component: StateDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateRoutingModule { }
