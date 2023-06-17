import { Injectable } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isLogged() && !req.url.startsWith("http://94.250.248.129:8001/")) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
      })
    }
    return next.handle(req).pipe(
      catchError(err => {
        console.log(err)
        if (err.status === 401) {
          this.authService.logout()
        }
        return throwError(err)
      })
    )
  }
}
