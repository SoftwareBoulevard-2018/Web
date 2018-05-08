import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(public service: GeneralServiceService, public router: Router) {
  }
  // Redirections depending on where the user clicks and the user in session

  redirect1(event) {
    if (this.service.user_type === 'Game Administrator') {
      this.router.navigate(['home/users']);
    } else {
      this.service.user_to_be_updated = this.search_user(this.service.username);
      this.router.navigate(['home/users/user-status']);
    }
  }

  redirect2(event) {
    if (this.service.user_type === 'Game Administrator') {
      this.router.navigate(['home/companies']);
    } else {
      this.router.navigate(['home/companies/company-status']);
    }
  }

  redirect3(event) {
    if (this.service.user_type === 'Game Administrator') {
      this.router.navigate(['home/reports']);
    } else if (this.service.user_type === 'Project Manager') {
      this.router.navigate(['home/users/projectmanager/functions']);
    } else {
      this.router.navigate(['home/play']);
    }
  }

  redirect4(event) {
    if (this.service.user_type === 'Game Administrator') {
      this.router.navigate(['home/set-up']);
    }
    else {
      this.router.navigate(['home/join-team']);
    }
  }

  ngOnInit() {
    console.log(this.service.user_type);
    if (this.service.user_type === undefined) {
      this.router.navigate(['']);
    }
  }
  search_user(username) {
    for (const user of this.service.users) {
      if (user.username === username) {
        return user;
      }
    }
  }
}
