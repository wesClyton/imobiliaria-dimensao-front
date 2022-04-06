
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PipesModule } from '../../../shared/pipes/pipes.module';
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
    MatSlideToggleModule,
    PipesModule
  ],
  exports: [
    UserFormDetailComponent,
    UserFormNewComponent
  ]
})
export class UserComponentsModule { }
