import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.guard';
import { Role } from '../auth/enums/role.enum';
import { RoleGuard } from '../auth/guards/auth-role.guard';
import { AllowedRoles } from '../auth/interfaces/allowed-role.interface';
import { EnterpriseDetailComponent } from './pages/detail/enterprise-detail.component';
import { EnterpriseListComponent } from './pages/list/enterprise-list.component';
import { EnterpriseNewComponent } from './pages/new/enterprise-new.component';
import { EnterpriseGetAllResolver } from './resolvers/enterprise-get-all.resolver';
import { EnterpriseGeByIdResolver } from './resolvers/enterprise-get-by-id.resolver';

const routes: Routes = [
  {
    path: '',
    component: EnterpriseListComponent,
    resolve: {
      enterpriseGetAll: EnterpriseGetAllResolver,
    }
  },
  {
    path: 'new',
    canDeactivate: [CanDeactivateGuard],
    canActivate: [RoleGuard],
    data: {
      roles: [Role.Admin, Role.Autor]
    } as AllowedRoles,
    component: EnterpriseNewComponent
  },
  {
    path: 'detail/:id',
    canDeactivate: [CanDeactivateGuard],
    resolve: {
      enterprise: EnterpriseGeByIdResolver
    },
    canActivate: [RoleGuard],
    data: {
      roles: [Role.Admin, Role.Autor, Role.Leitor, Role.Corretor]
    } as AllowedRoles,
    component: EnterpriseDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnterpriseRoutingModule { }
