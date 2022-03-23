import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ANNOUNCEMENT_CONFIG } from '../modules/announcement/announcement.config';
import { USER_CONFIG } from '../modules/user/user.config';
import { PanelAdminHomeComponent } from './pages/home/panel-admin-home.component';
import { PanelAdminComponent } from './panel-admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: PanelAdminComponent,
    children: [
      {
        path: 'home',
        component: PanelAdminHomeComponent
      },
      {
        path: USER_CONFIG.path,
        loadChildren: () => import('../modules/user/user.module').then(m => m.UserModule)
      },
      {
        path: ANNOUNCEMENT_CONFIG.path,
        loadChildren: () => import('../modules/announcement/announcement.module').then(m => m.AnnouncementModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelAdminRoutingModule { }
