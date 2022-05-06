import {Component, NgZone} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  private readonly statusSubscription: Subscription;

  constructor(private route: Router, private userService: UserService, private ngZone: NgZone) {
    this.statusSubscription = this.userService.status.asObservable().subscribe(status => {
      if(status){
        this.ngZone.run(() => {
          this.route.navigate([`/sales`]);
          if(this.statusSubscription != undefined){
            this.statusSubscription.unsubscribe();
          }
        });
      }
    });
  }

  signIn() {
    this.route.navigate([`/signIn`])
  }
}
