import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  public error(message: string): void { }

  public information(message: string): void { }

  public success(message: string): void { }

  public warning(message: string): void { }

}
