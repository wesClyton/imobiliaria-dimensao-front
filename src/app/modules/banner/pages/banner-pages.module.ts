import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AngularMaterialDialogConfirmationModule } from '../../../shared/angular-material/dialog-confirmation/angular-material-dialog-confirmation.module';
import { AngularMaterialTableModule } from '../../../shared/angular-material/table/angular-material-table.module';
import { CrudActionsModule } from '../../../shared/components/crud-actions/crud-actions.module';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { BannerComponentsModule } from '../components/banner-components.module';
import { BannerDetailComponent } from './detail/banner-detail.component';
import { BannerListComponent } from './list/banner-list.component';
import { BannerNewComponent } from './new/banner-new.component';

@NgModule({
  declarations: [
    BannerListComponent,
    BannerNewComponent,
    BannerDetailComponent
  ],
  imports: [
    CommonModule,
    BannerComponentsModule,
    CrudActionsModule,
    MatButtonModule,
    AngularMaterialTableModule,
    AngularMaterialDialogConfirmationModule,
    PipesModule
  ],
  exports: [
    BannerListComponent,
    BannerNewComponent,
    BannerDetailComponent
  ]
})
export class BannerPagesModule { }
