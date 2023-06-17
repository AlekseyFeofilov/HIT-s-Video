import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly router: Router) { }

  isLogged() {
    return localStorage.getItem('jwt') !== null;
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(["authorization"])
  }
}
