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
  admin: boolean

  constructor(private mdDialogRef: MatDialogRef<AddUserDialogComponent>, private snackbar: SnackbarService, private userService: UserService) {
    this.username = '';
    this.admin = false;
  }

  public cancel() {
    this.close(false);
  }

  public close(value: boolean) {
    this.mdDialogRef.close(value);
  }

  public confirm() {
    if (this.username.match(/^[a-zA-Z0-9]+$/)) {
      this.userService.addUser(new User(this.username, this.admin)).subscribe((response) => {
        this.close(true)
      }, (error) => {
        this.snackbar.open('Something Went Wrong! Please Verify that this user does not already exist', 'Dismiss', 10000);
      })
    } else {
      this.snackbar.open('Invalid Info', 'Dismiss', 5000);
    }
  }

  @HostListener("keydown.esc")
  public onEsc() {
    this.close(false);
  }
}
