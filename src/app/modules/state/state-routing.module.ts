import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from '../../shared/guards/can-deactivate/can-deactivate.guard';
import { StateListComponent } from './pages/list/state-list.component';
import { StateNewComponent } from './pages/new/state-new.component';

const routes: Routes = [
  {
    path: '',
    component: StateListComponent
  },
  {
    path: 'new',
    canDeactivate: [CanDeactivateGuard],
    component: StateNewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateRoutingModule { }
