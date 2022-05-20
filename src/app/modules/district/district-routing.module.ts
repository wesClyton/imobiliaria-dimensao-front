import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.guard';
import { Role } from '../auth/enums/role.enum';
import { RoleGuard } from '../auth/guards/auth-role.guard';
import { AllowedRoles } from '../auth/interfaces/allowed-role.interface';
import { DistrictDetailComponent } from './pages/detail/district-detail.component';
import { DistrictListComponent } from './pages/list/district-list.component';
import { DistrictNewComponent } from './pages/new/district-new.component';
import { DistrictGetAllResolver } from './resolvers/district-get-all.resolver';
import { DistrictGeByIdResolver } from './resolvers/district-get-by-id.resolver';

const routes: Routes = [
  {
    path: '',
    component: DistrictListComponent,
    resolve: {
      districtGetAll: DistrictGetAllResolver,
    }
  },
  {
    path: 'new',
    canDeactivate: [CanDeactivateGuard],
    canActivate: [RoleGuard],
    data: {
      roles: [Role.Admin, Role.Autor]
    } as AllowedRoles,
    component: DistrictNewComponent
  },
  {
    path: 'detail/:id',
    canDeactivate: [CanDeactivateGuard],
    resolve: {
      district: DistrictGeByIdResolver
    },
    canActivate: [RoleGuard],
    data: {
      roles: [Role.Admin, Role.Autor]
    } as AllowedRoles,
    component: DistrictDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistrictRoutingModule { }
