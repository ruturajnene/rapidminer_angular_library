import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RmLibService {

  auth_token: string;
  server_url: string;

  constructor() { }

  checkAuth() {
    const token = window.localStorage.getItem('jwt-token');
    const url = `${window.location.protocol}//${window.location.host}`;
    if (!token) {
      window.location.replace(`${url}/rapidminer-auth`);
    } else {
      this.auth_token = token;
      this.server_url = url;
    }
  }
}
