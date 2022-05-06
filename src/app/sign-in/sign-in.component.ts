import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  info: FormGroup;

  constructor(private userService: UserService) {
    this.info = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    })
  }

  signIn() {
    if(this.info.valid){
      this.userService.signIn(this.info.controls.username.value, this.info.controls.password.value)
    }
  }

}
