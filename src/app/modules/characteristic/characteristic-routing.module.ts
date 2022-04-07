import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.guard';
import { Role } from '../auth/enums/role.enum';
import { RoleGuard } from '../auth/guards/auth-role.guard';
import { AllowedRoles } from '../auth/interfaces/allowed-role.interface';
import { CharacteristicDetailComponent } from './pages/detail/characteristic-detail.component';
import { CharacteristicListComponent } from './pages/list/characteristic-list.component';
import { CharacteristicNewComponent } from './pages/new/characteristic-new.component';
import { CharacteristicGetAllResolver } from './resolvers/characteristic-get-all.resolver';
import { CharacteristicGeByIdResolver } from './resolvers/characteristic-get-by-id.resolver';

const routes: Routes = [
  {
    path: '',
    component: CharacteristicListComponent,
    resolve: {
      characteristicGetAll: CharacteristicGetAllResolver,
    }
  },
  {
    path: 'new',
    canDeactivate: [CanDeactivateGuard],
    canActivate: [RoleGuard],
    data: {
      roles: [Role.Admin, Role.Autor]
    } as AllowedRoles,
    component: CharacteristicNewComponent
  },
  {
    path: 'detail/:id',
    canDeactivate: [CanDeactivateGuard],
    resolve: {
      characteristic: CharacteristicGeByIdResolver
    },
    canActivate: [RoleGuard],
    data: {
      roles: [Role.Admin, Role.Autor]
    } as AllowedRoles,
    component: CharacteristicDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacteristicRoutingModule { }
