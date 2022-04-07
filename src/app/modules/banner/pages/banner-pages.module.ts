import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CrudActionsModule } from '../../../shared/components/crud-actions/crud-actions.module';
import { DialogConfirmationModule } from '../../../shared/components/dialog-confirmation/dialog-confirmation.module';
import { TableModule } from '../../../shared/components/table/table.module';
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
    TableModule,
    DialogConfirmationModule,
    PipesModule
  ],
  exports: [
    BannerListComponent,
    BannerNewComponent,
    BannerDetailComponent
  ]
})
export class BannerPagesModule { }
