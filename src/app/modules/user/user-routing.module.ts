import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAccountComponent } from './pages/account/user-account.component';

const routes: Routes = [
  {
    path: '',
    component: undefined
  },
  {
    path: 'account',
    component: UserAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
