import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.guard';
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
    component: AnnouncementNewComponent
  },
  {
    path: 'detail/:id',
    canDeactivate: [CanDeactivateGuard],
    resolve: {
      announcement: AnnouncementGeByIdResolver
    },
    component: AnnouncementDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementRoutingModule { }
