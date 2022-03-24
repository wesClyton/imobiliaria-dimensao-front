import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StateListComponent } from './pages/state-list.component';

const routes: Routes = [
  {
    path: '',
    component: StateListComponent
  },
  {
    path: 'new',
    component: undefined
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateRoutingModule { }
