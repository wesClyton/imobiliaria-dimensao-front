import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePT from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpCustomInterceptorModule } from './http-custom-interceptor/http-custom-interceptor.module';
import { LoadingModule } from './loading/loading.module';
import { NotificationModule } from './notification/notification.module';
registerLocaleData(localePT);

@NgModule({
  imports: [
    HttpClientModule,
    HttpCustomInterceptorModule,
    LoadingModule,
    NotificationModule,
    MatDialogModule
  ],
  exports: [LoadingModule],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-br'
    }
  ]
})
export class CoreModule { }
