import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { HttpStatusCodeEnum } from '../../enums/http-status-code.enum';
import { Error } from '../../interfaces/error.interface';
import { NotificationService } from '../notification/notification.service';

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
      if (response.status === HttpStatusCodeEnum.NotFound) {
        this.notificationService.error(`#${response.status} - Requisição não encontrada.`);
        return;
      }

      if (response.status === HttpStatusCodeEnum.InternalServerError) {
        this.notificationService.error(`#${response.status} - Ocorreu um erro interno no servidor.`);
        return;
      }

      if (response.statusText === 'Unknown Error') {
        this.notificationService.error(`#${response.status} - Ocorreu um erro desconhecido.`);
        return;
      }

      if (
        response.status === HttpStatusCodeEnum.Unauthorized ||
        response.statusText === 'Unauthorized' ||
        response.status === HttpStatusCodeEnum.Forbidden ||
        response.statusText === 'Forbidden') {
        this.notificationService.error(`#${response.status} - Seu token expirou, é inválido ou não tem permissão para acessar essa página.`);
        this.authService.logout();
        return;
      }

      if (response.error && response) {
        this.notificationService.error((response.error as Error).error);
        return;
      }

      this.notificationService.error('O sistema encontra-se indisponível.');
    } else {
      this.notificationService.error(`#${response.status} - O sistema encontra-se indisponível.`);
    }
  }

}
