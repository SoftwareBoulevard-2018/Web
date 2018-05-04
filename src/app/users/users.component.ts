import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from "@angular/router";
import {EmailComponent} from "../email/email.component";
import {MatTableDataSource, MatPaginator, MatSort} from "@angular/material";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public service: GeneralServiceService, public router: Router) { }

  //@ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;

  users = [];
  users2;

  table_titles = ["name","username", "password", "role","status","update"];

  ngOnInit() {
    console.log(this.service.user_type);
    if (this.service.user_type === undefined) {
      this.router.navigate([''])
    }

    else if (this.service.user_type === "Team Member" || this.service.user_type === "Project Manager") {
      this.router.navigate(['restricted'])
    }

    else {
      this.users = JSON.parse(JSON.stringify(this.service.users));
      for(let user of this.users){
        user.hide_password = true;
      }
      this.users2 = new MatTableDataSource(this.users);
      //this.users2.paginator = this.paginator;
      //this.users2.sort = this.sort;
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.users2.filter = filterValue;
  }

  search_user(username){
    for(let user of this.service.users){
      if(user.username === username){
        return user;
      }
    }
  }

  redirect(event,element){
    this.service.user_to_be_watched = this.search_user(element.username);
    this.router.navigate(['home/users/user-status']);
  }
  redirect2(event,element){
    this.service.user_to_be_updated = this.search_user(element.username);
    this.router.navigate(['home/users/user-status/update']);
  }
}
