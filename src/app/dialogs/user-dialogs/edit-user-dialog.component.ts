import {Component, HostListener, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SnackbarService} from "../../services/snackbar.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html'
})
export class EditUserDialogComponent{
  username: string
  admin: boolean

  constructor(@Inject(MAT_DIALOG_DATA) public data: User, private mdDialogRef: MatDialogRef<EditUserDialogComponent>, private snackbar: SnackbarService) {
    this.username = this.data.username;
    this.admin = this.data.admin;
  }

  public cancel() {
    this.close(false);
  }

  public close(value: any) {
    this.mdDialogRef.close(value);
  }

  public confirm() {
    if (this.username.match(/^[a-zA-Z0-9]+$/)) {
      this.close(new User(this.username, this.admin));
    } else {
      this.snackbar.open('Invalid Info', 'Dismiss', 5000);
    }
  }

  @HostListener("keydown.esc")
  public onEsc() {
    this.close(false);
  }
}
