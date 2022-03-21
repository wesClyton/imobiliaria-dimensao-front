import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  constructor() { }

  public static sessionSetItem(key: string, object: any): void {
    sessionStorage.setItem(key, JSON.stringify(object));
  }

  public static sessionGetItem(key: string): any {
    const value: any = sessionStorage.getItem(key);
    return JSON.parse(JSON.parse(value));
  }

  public static sessionRemoveItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  public static sessionClear(): void {
    sessionStorage.clear();
  }

  public static localSetItem(key: string, object: any): void {
    localStorage.setItem(key, JSON.stringify(object));
  }

  public static localGetItem(key: string): any {
    const value: any = localStorage.getItem(key);
    return JSON.parse(JSON.parse(value));
  }

  public static localRemoveItem(key: string): void {
    localStorage.removeItem(key);
  }

  public static localClear(): void {
    localStorage.clear();
  }

}
