import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../services/user.service";
import { SnackbarService } from "../services/snackbar.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  info: FormGroup;

  constructor(private userService: UserService, private snackbar: SnackbarService, private router: Router) {
    this.info = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    })
  }

  signIn() {
    if(this.info.valid){
      this.userService.signIn(this.info.controls.username.value, this.info.controls.password.value).then(ans => {
        if(ans) {
          this.router.navigate([`sales`]).then();
        } else {
          this.snackbar.open("Invalid username or password. Please try again" , "Dismiss", 5000);
        }
      }).catch(ans => this.snackbar.open("bad", "Dismiss", 5000));
    } else {
      this.snackbar.open("The username or password is missing", "Dismiss", 5000);
    }
  }

}
