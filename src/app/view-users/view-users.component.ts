import { Component } from '@angular/core';
import { UserService } from "../services/user.service";
import { MatTableDataSource } from "@angular/material/table";
import { DialogService } from "../dialogs/dialog.service";
import { SnackbarService } from "../services/snackbar.service";
import { User } from "../models/user";

@Component({
  selector: 'app-view-users',
  styleUrls: ['./view-users.component.css'],
  templateUrl: './view-users.component.html',
})
export class ViewUsersComponent {
  users: User[];
  displayedColumns = ['Username','Is admin','Edit','Delete'];
  dataSource: MatTableDataSource<User>

  constructor(private userService: UserService, private dialogService: DialogService, private snackbar: SnackbarService) {
    this.users = [];
    this.dataSource = new MatTableDataSource<User>();
    this.updateUsers();
  }

  updateUsers(): void {
    this.userService.getUsers().subscribe(answers => {
      this.dataSource.data = answers;
      this.users = answers;
    });
  }

  addUser(){
    this.dialogService.openAddUser().then(ans => {
      this.updateUsers();
    }).catch(ans => this.snackbar.open("User not added" , "Dismiss", 5000));
  }

  editUser(user: User){
    this.dialogService.openEditUser(user).then(ans =>{
      this.userService.changeUser(user.username, ans[0]).subscribe(ans => this.updateUsers());
      if(ans.length != 1) {
        this.userService.changeUserPassword(user.username, ans[1]).subscribe(ans => this.updateUsers());
      }
    }).catch(ans => this.snackbar.open("Something went wrong editing user" , "Dismiss", 5000));
  }

  deleteUser(user:User) {
    if(user.username == this.userService.username.value){
      this.snackbar.open("You cannot delete yourself" , "Dismiss", 5000)
    }else {
      this.dialogService.openConfirmDelete(user).then(ans => {
        if (ans) {
          this.userService.deleteUser(user.username).subscribe(ans => this.updateUsers());
        }
      }).catch(ans => this.snackbar.open("Something went wrong deleting user", "Dismiss", 5000));
    }
  }
}
