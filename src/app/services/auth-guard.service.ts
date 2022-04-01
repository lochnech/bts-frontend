import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from "./user.service";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    return new Promise<boolean>((res) => {
      this.userService.status.asObservable().subscribe(status => {
        if (status) {
          res(true);
        } else {
          this.router.navigate(['']);
          res(false);
        }
      });
    })
  }
}
