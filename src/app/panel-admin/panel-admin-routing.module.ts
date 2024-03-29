import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ANNOUNCEMENT_CONFIG } from '../modules/announcement/announcement.config';
import { BANNER_CONFIG } from '../modules/banner/banner.config';
import { BROKER_CONFIG } from '../modules/broker/broker.config';
import { CHARACTERISTIC_CONFIG } from '../modules/characteristic/characteristic.config';
import { CITY_CONFIG } from '../modules/city/city.config';
import { DISTRICT_CONFIG } from '../modules/district/district.config';
import { ENTERPRISE_CONFIG } from '../modules/enterprise/enterprise.config';
import { STATE_CONFIG } from '../modules/state/state.config';
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
        path: ANNOUNCEMENT_CONFIG.path,
        loadChildren: () => import('../modules/announcement/announcement.module').then(m => m.AnnouncementModule)
      },
      {
        path: BANNER_CONFIG.path,
        loadChildren: () => import('../modules/banner/banner.module').then(m => m.BannerModule)
      },
      {
        path: CHARACTERISTIC_CONFIG.path,
        loadChildren: () => import('../modules/characteristic/characteristic.module').then(m => m.CharacteristicModule)
      },
      {
        path: BROKER_CONFIG.path,
        loadChildren: () => import('../modules/broker/broker.module').then(m => m.BrokerModule)
      },
      {
        path: ENTERPRISE_CONFIG.path,
        loadChildren: () => import('../modules/enterprise/enterprise.module').then(m => m.EnterpriseModule)
      },
      {
        path: DISTRICT_CONFIG.path,
        loadChildren: () => import('../modules/district/district.module').then(m => m.DistrictModule)
      },
      {
        path: CITY_CONFIG.path,
        loadChildren: () => import('../modules/city/city.module').then(m => m.CityModule)
      },
      {
        path: STATE_CONFIG.path,
        loadChildren: () => import('../modules/state/state.module').then(m => m.StateModule)
      },
      {
        path: USER_CONFIG.path,
        loadChildren: () => import('../modules/user/user.module').then(m => m.UserModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelAdminRoutingModule { }
