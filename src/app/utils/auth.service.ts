import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getAuthorizationToken() {
    let token = localStorage.getItem("Authorization");
    if (token) return token;
    return null;
  }
}
