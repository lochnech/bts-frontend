import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from "../services/user.service";

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = httpRequest.clone({
      headers: new HttpHeaders(this.userService.userToken.getValue())
    });
    return next.handle(authReq);
  }
}
