import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialDialogConfirmationModule } from '../../../shared/angular-material/dialog-confirmation/angular-material-dialog-confirmation.module';
import { AngularMaterialTableModule } from '../../../shared/angular-material/table/angular-material-table.module';
import { CrudActionsModule } from '../../../shared/components/crud-actions/crud-actions.module';
import { CharacteristicComponentsModule } from '../components/characteristic-components.module';
import { CharacteristicPipesModule } from '../pipes/characteristic-pipes.module';
import { CharacteristicDetailComponent } from './detail/characteristic-detail.component';
import { CharacteristicListComponent } from './list/characteristic-list.component';
import { CharacteristicNewComponent } from './new/characteristic-new.component';

@NgModule({
  declarations: [
    CharacteristicListComponent,
    CharacteristicNewComponent,
    CharacteristicDetailComponent
  ],
  imports: [
    CommonModule,
    CharacteristicComponentsModule,
    CrudActionsModule,
    AngularMaterialTableModule,
    AngularMaterialDialogConfirmationModule,
    CharacteristicPipesModule
  ],
  exports: [
    CharacteristicListComponent,
    CharacteristicNewComponent,
    CharacteristicDetailComponent
  ]
})
export class CharacteristicPagesModule { }
