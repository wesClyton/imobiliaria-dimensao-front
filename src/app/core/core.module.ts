import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpCustomInterceptorModule } from './http-custom-interceptor/http-custom-interceptor.module';
import { LoadingModule } from './loading/loading.module';
import { NotificationModule } from './notification/notification.module';

@NgModule({
  imports: [
    HttpClientModule,
    HttpCustomInterceptorModule,
    LoadingModule,
    NotificationModule,
    MatDialogModule
  ],
  exports: [LoadingModule]
})
export class CoreModule { }
