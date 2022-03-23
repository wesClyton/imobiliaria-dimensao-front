import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { PageErroComponent } from './page-erro/page-erro.component';

const routes: Routes = [
  { path: '', redirectTo: 'erro', pathMatch: 'full' },
  {
    path: 'erro',
    component: PageErroComponent
  }
];

@NgModule({
  declarations: [PageErroComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class PageModule { }
