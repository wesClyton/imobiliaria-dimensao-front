import { Injectable } from '@angular/core';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  private readonly encryptLocalStorage = new EncryptStorage(environment.encryptStorageSecret, { storageType: 'localStorage' });

  private readonly encryptSessionStorage = new EncryptStorage(environment.encryptStorageSecret, { storageType: 'sessionStorage' });

  constructor() { }

  public static sessionSetItem(key: string, object: any): void {
    return new StorageService().encryptSessionStorage.setItem(key, object);
  }

  public static sessionGetItem(key: string): any {
    return new StorageService().encryptSessionStorage.getItem(key);
  }

  public static sessionRemoveItem(key: string): void {
    new StorageService().encryptSessionStorage.removeItem(key);
  }

  public static sessionClear(): void {
    new StorageService().encryptSessionStorage.clear();
  }

  public static localSetItem(key: string, object: any): void {
    new StorageService().encryptLocalStorage.setItem(key, object);
  }

  public static localGetItem(key: string): any {
    return new StorageService().encryptLocalStorage.getItem(key);
  }

  public static localRemoveItem(key: string): void {
    new StorageService().encryptLocalStorage.removeItem(key);
  }

  public static localClear(): void {
    new StorageService().encryptLocalStorage.clear();
  }

}
