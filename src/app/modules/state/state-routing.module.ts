import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.guard';
import { StateDetailComponent } from './pages/detail/state-detail.component';
import { StateListComponent } from './pages/list/state-list.component';
import { StateNewComponent } from './pages/new/state-new.component';
import { StateGetAllResolver } from './resolvers/state-get-all.resolver';
import { StateGeByIdResolver } from './resolvers/state-get-by-id.resolver';

const routes: Routes = [
  {
    path: '',
    component: StateListComponent,
    resolve: {
      stateGetAll: StateGetAllResolver,
    }
  },
  {
    path: 'new',
    canDeactivate: [CanDeactivateGuard],
    component: StateNewComponent
  },
  {
    path: 'detail/:id',
    canDeactivate: [CanDeactivateGuard],
    resolve: {
      state: StateGeByIdResolver
    },
    component: StateDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateRoutingModule { }
