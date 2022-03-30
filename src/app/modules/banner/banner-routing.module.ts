import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.guard';
import { BannerDetailComponent } from './pages/detail/banner-detail.component';
import { BannerListComponent } from './pages/list/banner-list.component';
import { BannerNewComponent } from './pages/new/banner-new.component';
import { BannerGetAllResolver } from './resolvers/banner-get-all.resolver';
import { BannerGeByIdResolver } from './resolvers/banner-get-by-id.resolver';

const routes: Routes = [
  {
    path: '',
    component: BannerListComponent,
    resolve: {
      bannerGetAll: BannerGetAllResolver,
    }
  },
  {
    path: 'new',
    canDeactivate: [CanDeactivateGuard],
    component: BannerNewComponent
  },
  {
    path: 'detail/:id',
    canDeactivate: [CanDeactivateGuard],
    resolve: {
      banner: BannerGeByIdResolver
    },
    component: BannerDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannerRoutingModule { }
