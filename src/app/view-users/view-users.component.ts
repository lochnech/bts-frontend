import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {MatTableDataSource} from "@angular/material/table";
import {Token} from "@angular/compiler";



export interface User {
  username: string;
  admin: boolean;
}



@Component({
  selector: 'app-view-users',
  styleUrls: ['./view-users.component.css'],
  templateUrl: './view-users.component.html',
})
export class ViewUsersComponent implements OnInit {
  users: User[];

  displayedColumns = ['username', 'password', 'boolean'];
  dataSource: MatTableDataSource<User>





  constructor(private userService: UserService) {
    this.users = [];
    this.dataSource = new MatTableDataSource<User>()


  }

  updateUsers(): void {
    this.userService.getUsers().subscribe(answers => {
      this.dataSource.data = answers;
      this.users = answers
    });
  }

  addUser(){
    this.dialogService.openAddUser().then(ans => {
      this.updateUsers();

    }).catch(ans => this.snackbar.open("User not added" , "Dismiss", 5000));

  }

  editUser(user: User){
    this.dialogService.openEditUser(user).then(ans =>{
      this.userService.changeUser(User.username, ans).subscribe(ans => this.updateUsers());
    }).catch(ans => this.snackbar.open("Something went wrong editing user" , "Dismiss", 5000));
  }

  deleteUser(user:User) {
    this.dialogService.openConfirmDelete(user).then(ans =>{
      if(ans){
        this.userService.deleteUser(user.username).subscribe(ans => this.updateUsers());
      }
    }).catch(ans => this.snackbar.open("Something went wrong deleting user" , "Dismiss", 5000));
  }







  ngOnInit(): void {
  }

}
