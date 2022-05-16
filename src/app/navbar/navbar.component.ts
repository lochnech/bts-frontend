import { Component } from '@angular/core';
import { UserService } from "../services/user.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

  status: Observable<boolean>;
  is_admin: Observable<boolean>

  constructor(public userService: UserService) {
    this.status = userService.status.asObservable();
    this.is_admin = userService.is_admin.asObservable()
  }

  signUserOut(): void {
    this.userService.signOut();
  }

}
