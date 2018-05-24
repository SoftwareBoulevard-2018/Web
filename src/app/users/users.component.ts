import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from '@angular/router';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import { HttpService } from '../http.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }

  // Paginator will be implemented later
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  // Variables necessary for the material table
  users2: MatTableDataSource<User>;
  users = [];

  table_titles = ['createdAt', 'name', 'username', 'password', 'role', 'company', 'status', 'update'];


  ngOnInit() {
    // Transforms the data to the necessary format to be read by material tables
    console.log(this.service.user_type);
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    } else if (this.service.user_type === 'Team Member' || this.service.user_type === 'Project Manager') {
      this.router.navigate(['restricted']);
    } else {
      this.users2 = new MatTableDataSource(this.users);
      this.getAllUsers();
      console.log(this.users2);
      /* this.users = JSON.parse(JSON.stringify(this.service.users));
      this.getAllUsers();
      console.log(this.users);
      for (const user of this.users) {
        user.hide_password = true;
      }
      this.users2 = new MatTableDataSource(this.users);
      console.log(this.users2);
      // this.users2.paginator = this.paginator;
      // this.users2.sort = this.sort; */
    }
  }

  getAllUsers() {
    return this.httpService.getAllUsers().subscribe(data => this.listUser(data));
  }

  getCompanyById(companyId, user) {
    return this.httpService.getCompanyById(companyId).subscribe(data => {
      user.companyName = data.name;
      user.hide_password = true;
      this.users.push({ id: user.id, createdAt: user.createdAt,
        name: user.name, username: user.username,
        password: user.password, role: user.role, companyName: user.companyName,
      hide_password: true});
      this.users2.data = this.users;
      console.log(this.users2);
    }, error => {
        user.companyName = undefined;
        user.hide_password = true;
        this.users.push({ id: user.id, createdAt: user.createdAt,
          name: user.name, username: user.username,
          password: user.password, role: user.role, companyName: user.companyName,
          hide_password: true});
        this.users2.data = this.users;
        console.log(this.users2);
      });
  }

  listUser(data) {
    console.log(data);
    this.users = [];
    for (const value of Object.values(data.data)) {
     this.getCompanyById(value.companyId, value);
    }
  }

  applyFilter(filterValue: string) {
    // Function necessary by the table filter
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.users2.filter = filterValue;
  }

  /* search_user(username) {
    // Searches user by its username
    for (const user of this.service.users) {
      if (user.username === username) {
        return user;
      }
    }
  } */

  redirect(event, element) {
    // Redirects to User status and defines the necessary variables
    this.service.user_to_be_updated = element.id;
    this.router.navigate(['home/users/user-status']);
  }
  redirect2(event, element) {
    // Redirects to User update and defines the necessary variables
    this.service.user_to_be_updated = element.id;
    this.router.navigate(['home/users/user-status/update']);
  }
  redirect3(event) {
    this.router.navigate(['home/users/create']);
  }
}
