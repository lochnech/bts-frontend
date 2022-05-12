import {Component} from '@angular/core';
import {UserService} from "../services/user.service";
import {MatTableDataSource} from "@angular/material/table";
import {DialogService} from "../dialogs/dialog.service";
import {SnackbarService} from "../services/snackbar.service";
import {User} from "../models/user";

@Component({
  selector: 'app-view-users',
  styleUrls: ['./view-users.component.css'],
  templateUrl: './view-users.component.html',
})
export class ViewUsersComponent {
  users: User[];
  displayedColumns = ['username','is an admin','edit','delete'];
  dataSource: MatTableDataSource<User>

  constructor(private userService: UserService, private dialogService: DialogService, private snackbar: SnackbarService) {
    this.users = [];
    this.dataSource = new MatTableDataSource<User>();
    this.updateUsers();
  }

  updateUsers(): void {
    this.userService.getUsers().subscribe(answers => {
      console.log(answers)
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
      this.userService.changeUser(user.username, ans).subscribe(ans => this.updateUsers());
    }).catch(ans => this.snackbar.open("Something went wrong editing user" , "Dismiss", 5000));
  }

  deleteUser(user:User) {
    this.dialogService.openConfirmDelete(user).then(ans =>{
      if(ans){
        this.userService.deleteUser(user.username).subscribe(ans => this.updateUsers());
      }
    }).catch(ans => this.snackbar.open("Something went wrong deleting user" , "Dismiss", 5000));
  }
}
