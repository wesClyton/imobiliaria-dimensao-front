import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StateListComponent } from './pages/list/state-list.component';
import { StateNewComponent } from './pages/new/state-new.component';

const routes: Routes = [
  {
    path: '',
    component: StateListComponent
  },
  {
    path: 'new',
    component: StateNewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateRoutingModule { }
