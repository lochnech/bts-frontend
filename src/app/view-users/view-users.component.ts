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
  displayedColumns: string[] = ['username', 'password', 'boolean'];
  dataSource: MatTableDataSource<any>




  constructor(private userService: UserService) {
    this.dataSource = new MatTableDataSource<any>()



  }







  ngOnInit(): void {
  }

}
