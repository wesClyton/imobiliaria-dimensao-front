import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExceptionService } from '../../../shared/services/exception/exception.service';
import { HttpCrudService } from '../../../shared/services/http/crud/http-crud.service';
import { BANNER_CONFIG } from '../banner.config';
import { BannerCreateResponse } from '../interfaces/banner-create-reponse.interface';
import { Banner } from '../interfaces/banner-create.interface';
import { BannerGetAll } from '../interfaces/banner-get-all.interface';
import { BannerUpdateResponse } from '../interfaces/banner-update-response.interface';
import { BannerUpdate } from '../interfaces/banner-update.interface';
import { BannerCreate } from '../interfaces/banner.interface';

@Injectable({
  providedIn: 'root'
})
export class BannerService extends HttpCrudService<BannerCreate, BannerCreateResponse, BannerGetAll, Banner, BannerUpdate, BannerUpdateResponse> {

  constructor(
    public readonly httpClient: HttpClient,
    public readonly exceptionService: ExceptionService
  ) {
    super(
      httpClient,
      exceptionService,
      BANNER_CONFIG.pathApiSingle,
      BANNER_CONFIG.pathApiPlural
    )
  }

}
