import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.guard';
import { Role } from '../auth/enums/role.enum';
import { RoleGuard } from '../auth/guards/auth-role.guard';
import { AllowedRoles } from '../auth/interfaces/allowed-role.interface';
import { CityDetailComponent } from './pages/detail/city-detail.component';
import { CityListComponent } from './pages/list/city-list.component';
import { CityNewComponent } from './pages/new/city-new.component';
import { CityGetAllResolver } from './resolvers/city-get-all.resolver';
import { CityGeByIdResolver } from './resolvers/city-get-by-id.resolver';

const routes: Routes = [
  {
    path: '',
    component: CityListComponent,
    resolve: {
      cityGetAll: CityGetAllResolver,
    }
  },
  {
    path: 'new',
    canDeactivate: [CanDeactivateGuard],
    canActivate: [RoleGuard],
    data: {
      roles: [Role.Admin, Role.Autor]
    } as AllowedRoles,
    component: CityNewComponent
  },
  {
    path: 'detail/:id',
    canDeactivate: [CanDeactivateGuard],
    resolve: {
      city: CityGeByIdResolver
    },
    canActivate: [RoleGuard],
    data: {
      roles: [Role.Admin, Role.Autor]
    } as AllowedRoles,
    component: CityDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityRoutingModule { }
