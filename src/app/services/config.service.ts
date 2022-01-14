import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private local = false;

  constructor() { }

  get data() {
    return {
      apiBaseUrl: this.local ? "http://localhost:8080/" : "https://clientes.api.greenborn.com.ar/",
      loginAction:"login",
      appName: "app_clients_dev-"
    };
  }

  get loginUrl() { 
    return this.data.apiBaseUrl + this.data.loginAction 
  }
  
  get tokenKey() { 
    return this.data.appName + 'token' 
  }

  apiUrl(recurso: string) { 
    return this.data.apiBaseUrl + recurso
  }

  setLocalStorage(r: string, v: any): void {
    if (v == null) {
      localStorage.removeItem(this.data.appName + r)
    } else {
      localStorage.setItem(this.data.appName + r, v .toString())
    }

  }
  getLocalStorage(r: string): string {
    return localStorage.getItem(this.data.appName + r)
  }

}
