
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthDirectiveModule } from '../../auth/directives/auth-directive.module';
import { UserFormDetailComponent } from './form-detail/user-form-detail.component';
import { UserFormNewComponent } from './form-new/user-form-new.component';

@NgModule({
  declarations: [
    UserFormDetailComponent,
    UserFormNewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatSelectModule,
    MatInputModule,
    AuthDirectiveModule,
    MatSlideToggleModule
  ],
  exports: [
    UserFormDetailComponent,
    UserFormNewComponent
  ]
})
export class UserComponentsModule { }
