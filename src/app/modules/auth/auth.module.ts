import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { AuthLoginComponent } from './pages/login/auth-login.component';

@NgModule({
  declarations: [
    AuthComponent,
    AuthLoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    FlexLayoutModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class AuthModule { }
