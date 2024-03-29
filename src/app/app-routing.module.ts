import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AUTH_CONFIG } from './modules/auth/auth.config';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { PAGES_CONFIG } from './pages/page.config';
import { PANEL_ADMIN_CONFIG } from './panel-admin/panel-admin.config';

const routes: Routes = [
  {
    path: '',
    redirectTo: AUTH_CONFIG.path,
    pathMatch: 'full'
  },
  {
    path: AUTH_CONFIG.path,
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: PANEL_ADMIN_CONFIG.path,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: () => import('./panel-admin/panel-admin.module').then(m => m.PanelAdminModule)
  },
  {
    path: PAGES_CONFIG.path,
    loadChildren: () => import('./pages/page.module').then(m => m.PageModule)
  },
  {
    path: '**',
    redirectTo: PAGES_CONFIG.path,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
