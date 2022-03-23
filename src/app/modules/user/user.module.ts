import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserAccountComponent } from './pages/account/user-account.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserAccountComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
