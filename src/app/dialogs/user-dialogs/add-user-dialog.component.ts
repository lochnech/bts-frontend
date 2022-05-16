import { Component, HostListener } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import {SnackbarService} from "../../services/snackbar.service";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html'
})
export class AddUserDialogComponent{
  username: string
  password: string
  passwordConfirm: string
  is_admin: boolean

  constructor(private mdDialogRef: MatDialogRef<AddUserDialogComponent>, private snackbar: SnackbarService, private userService: UserService) {
    this.username = '';
    this.password = '';
    this.passwordConfirm = '';
    this.is_admin = false;
  }

  public cancel() {
    this.close(false);
  }

  public close(value: boolean) {
    this.mdDialogRef.close(value);
  }

  public confirm() {
    if (this.username.match(/^[a-zA-Z0-9]+$/) && this.password == this.passwordConfirm) {
      this.userService.addUser(new User(this.username, this.is_admin), this.password).subscribe((response) => {
        this.close(true)
      }, (error) => {
        this.snackbar.open('Something Went Wrong! Please Verify that this user does not already exist', 'Dismiss', 10000);
      })
    } else {
      this.snackbar.open('Invalid Info. Please Verify the Passwords Match', 'Dismiss', 5000);
    }
  }

  @HostListener("keydown.esc")
  public onEsc() {
    this.close(false);
  }
}
