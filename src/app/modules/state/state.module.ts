import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AngularMaterialDialogConfirmationModule } from '../../shared/angular-material/dialog-confirmation/angular-material-dialog-confirmation.module';
import { AngularMaterialTableModule } from '../../shared/angular-material/table/angular-material-table.module';
import { CrudActionsModule } from '../../shared/components/crud-actions/crud-actions.module';
import { StateFormDetailComponent } from './components/form-detail/state-form-detail.component';
import { StateFormNewComponent } from './components/form-new/state-form-new.component';
import { StateDetailComponent } from './pages/detail/state-detail.component';
import { StateListComponent } from './pages/list/state-list.component';
import { StateNewComponent } from './pages/new/state-new.component';
import { StateRoutingModule } from './state-routing.module';

@NgModule({
  declarations: [
    StateListComponent,
    StateNewComponent,
    StateDetailComponent,
    StateFormNewComponent,
    StateFormDetailComponent
  ],
  imports: [
    CommonModule,
    StateRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatSelectModule,
    AngularMaterialTableModule,
    CrudActionsModule,
    AngularMaterialDialogConfirmationModule
  ]
})
export class StateModule { }
