import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpCustomInterceptorModule } from './http-custom-interceptor/http-custom-interceptor.module';
import { LoadingModule } from './loading/loading.module';

@NgModule({
  imports: [
    HttpClientModule,
    HttpCustomInterceptorModule,
    LoadingModule,
  ],
  exports: [LoadingModule]
})
export class CoreModule { }
