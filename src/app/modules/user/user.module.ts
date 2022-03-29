import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserPagesModule } from './pages/user-pages.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    UserPagesModule
  ]
})
export class UserModule { }
