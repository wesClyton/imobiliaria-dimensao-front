import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { NotificationService } from '../../../core/notification/notification.service';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { HttpStatusCode } from '../../enums/http-status-code.enum';
import { TypeORMError } from '../../enums/type-orm-error.enum';
import { ApiError } from '../../interfaces/api-error.interface';

@Injectable({
  providedIn: 'root'
})
export class ExceptionService implements ErrorHandler {

  constructor(
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService
  ) { }

  handleError(response: any): void {
    if (response instanceof HttpErrorResponse) {
      if (response.status === HttpStatusCode.NotFound) {
        this.notificationService.error(`#${response.status} - Requisição não encontrada.`);
        return;
      }

      if (response.status === HttpStatusCode.InternalServerError) {
        this.notificationService.error(`#${response.status} - Ocorreu um erro interno no servidor.`);
        return;
      }

      if (response.statusText === 'Unknown Error') {
        this.notificationService.error(`#${response.status} - Ocorreu um erro desconhecido.`);
        return;
      }

      if (
        response.status === HttpStatusCode.Unauthorized ||
        response.statusText === 'Unauthorized' ||
        response.status === HttpStatusCode.Forbidden ||
        response.statusText === 'Forbidden') {
        this.notificationService.error(`#${response.status} - Seu token expirou, é inválido ou não tem permissão para acessar essa página.`);
        this.authService.logout();
        return;
      }

      if (response.error && response) {
        (response.error as Array<ApiError>).forEach(erro => {
          Object.keys(erro.constraints).forEach(key => {
            this.notificationService.error(erro.constraints[key as TypeORMError] || `#${response.status} - Ocorreu um erro desconhecido.`);
          });
        });
        return;
      }

      this.notificationService.error(`#${response.status} - O sistema encontra-se indisponível.`);
    } else {
      this.notificationService.error(`#${response.status} - O sistema encontra-se indisponível.`);
    }
  }

}
