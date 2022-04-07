import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.guard';
import { Role } from '../auth/enums/role.enum';
import { RoleGuard } from '../auth/guards/auth-role.guard';
import { AllowedRoles } from '../auth/interfaces/allowed-role.interface';
import { AnnouncementDetailComponent } from './pages/detail/announcement-detail.component';
import { AnnouncementListComponent } from './pages/list/announcement-list.component';
import { AnnouncementNewComponent } from './pages/new/announcement-new.component';
import { AnnouncementGetAllResolver } from './resolvers/announcement-get-all.resolver';
import { AnnouncementGeByIdResolver } from './resolvers/announcement-get-by-id.resolver';

const routes: Routes = [
  {
    path: '',
    component: AnnouncementListComponent,
    resolve: {
      announcementGetAll: AnnouncementGetAllResolver,
    }
  },
  {
    path: 'new',
    canDeactivate: [CanDeactivateGuard],
    canActivate: [RoleGuard],
    data: {
      roles: [Role.Admin, Role.Autor]
    } as AllowedRoles,
    component: AnnouncementNewComponent
  },
  {
    path: 'detail/:id',
    canDeactivate: [CanDeactivateGuard],
    resolve: {
      announcement: AnnouncementGeByIdResolver
    },
    canActivate: [RoleGuard],
    data: {
      roles: [Role.Admin, Role.Autor, Role.Leitor]
    } as AllowedRoles,
    component: AnnouncementDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementRoutingModule { }
