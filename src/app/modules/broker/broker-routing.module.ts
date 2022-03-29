import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../shared/guards/can-deactivate-dialog/can-deactivate-dialog.guard';
import { BrokerDetailComponent } from './pages/detail/broker-detail.component';
import { BrokerListComponent } from './pages/list/broker-list.component';
import { BrokerNewComponent } from './pages/new/broker-new.component';
import { BrokerGetAllResolver } from './resolvers/broker-get-all.resolver';
import { BrokerGeByIdResolver } from './resolvers/broker-get-by-id.resolver';

const routes: Routes = [
  {
    path: '',
    component: BrokerListComponent,
    resolve: {
      brokerGetAll: BrokerGetAllResolver,
    }
  },
  {
    path: 'new',
    canDeactivate: [CanDeactivateGuard],
    component: BrokerNewComponent
  },
  {
    path: 'detail/:id',
    canDeactivate: [CanDeactivateGuard],
    resolve: {
      broker: BrokerGeByIdResolver
    },
    component: BrokerDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrokerRoutingModule { }
