import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CrudActionsModule } from '../../../shared/components/crud-actions/crud-actions.module';
import { DialogConfirmationModule } from '../../../shared/components/dialog-confirmation/dialog-confirmation.module';
import { TableModule } from '../../../shared/components/table/table.module';
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
    TableModule,
    DialogConfirmationModule,
    CharacteristicPipesModule
  ],
  exports: [
    CharacteristicListComponent,
    CharacteristicNewComponent,
    CharacteristicDetailComponent
  ]
})
export class CharacteristicPagesModule { }
