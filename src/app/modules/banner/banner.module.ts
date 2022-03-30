import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BannerRoutingModule } from './banner-routing.module';
import { BannerPagesModule } from './pages/banner-pages.module';

@NgModule({
  imports: [
    CommonModule,
    BannerRoutingModule,
    BannerPagesModule
  ]
})
export class BannerModule { }
