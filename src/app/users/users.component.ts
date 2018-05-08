import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from '@angular/router';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public service: GeneralServiceService, public router: Router) { }

  // Paginator will be implemented later
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  // Variables necessary for the material table
  users = [];
  users2;


  table_titles = ['creation_date', 'name', 'username', 'password', 'role', 'company', 'status', 'update'];


  ngOnInit() {
    // Transforms the data to the necessary format to be read by material tables
    console.log(this.service.user_type);
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    } else if (this.service.user_type === 'Team Member' || this.service.user_type === 'Project Manager') {
      this.router.navigate(['restricted']);
    } else {
      this.users = JSON.parse(JSON.stringify(this.service.users));
      for (const user of this.users) {
        user.hide_password = true;
      }
      this.users2 = new MatTableDataSource(this.users);
      console.log(this.users2);
      // this.users2.paginator = this.paginator;
      // this.users2.sort = this.sort;
    }
  }

  applyFilter(filterValue: string) {
    // Function necessary by the table filter
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.users2.filter = filterValue;
  }

  search_user(username) {
    // Searches user by its username
    for (const user of this.service.users) {
      if (user.username === username) {
        return user;
      }
    }
  }

  redirect(event, element) {
    // Redirects to User status and defines the necessary variables
    this.service.user_to_be_updated = this.search_user(element.username);
    this.router.navigate(['home/users/user-status']);
  }
  redirect2(event, element) {
    // Redirects to User update and defines the necessary variables
    this.service.user_to_be_updated = this.search_user(element.username);
    this.router.navigate(['home/users/user-status/update']);
  }
  redirect3(event) {
    this.router.navigate(['home/users/create']);
  }
}
