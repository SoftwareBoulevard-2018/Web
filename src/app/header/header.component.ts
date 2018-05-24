import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from '../general-service.service';
import { HttpService } from '../http.service';
import {Router} from '@angular/router';
import {User} from '../shared/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // This user was made to test the creation service
  // user = new User('Andres', 'afaguilarr', 'olaola', 'Analyst');
  // This user was made to test the update service
  // user = { username: 'WORK!!!' };

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }

  ngOnInit() {
    // this.getAllCompanies();
    // this.getUserById('5b0221ef5e9e8127bc3f1a5a');
    // this.getUserByUsername('jpchaves');
    // this.createUser(this.user);
    // this.updateUser(this.user, '5b0221ef5e9e8127bc3f1a5a');
  }

  /* getAllCompanies() {
    return this.httpService.getAllCompanies().subscribe(data => console.log(data));
  }
  getUserById(userId) {
    return this.httpService.getUserById(userId).subscribe(data => console.log(data));
  }
  getUserByUsername(username) {
    return this.httpService.getUserByUsername(username).subscribe(data => console.log(data));
  } */
  /* createUser(user) {
    return this.httpService.createUser(user).subscribe(data => console.log(data));
  } */
  /* updateUser(user, userId) {
    return this.httpService.updateUser(user, userId).subscribe(data => console.log(data));
  } */

  // All these functions redirect to certain component depending on the user in session and the element clicked
  redirectHome(event) {
    if (this.service.user_type === 'Game Administrator') {
      this.router.navigate(['home']);
    } else if (this.service.user_type === 'Project Manager') {
      this.router.navigate(['home']);
    } else if (this.service.user_type === 'Team Member') {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['home']);
    }
  }

  redirectMyCompany(event) {
    this.router.navigate(['home/companies/company-status']);
  }
  redirectMyStatus(event) {
    this.service.user_to_be_updated = this.search_user(this.service.username);
    this.router.navigate(['home/users/user-status']);
  }

  redirectCompanies(event) {
    this.router.navigate(['home/companies']);
  }
  redirectCreateCompany(event) {
    this.router.navigate(['home/companies/create']);
  }

  redirectMyFunctions(event){
    this.router.navigate(['home/users/projectmanager/functions']);
  }
  redirectUsers(event) {
    this.router.navigate(['home/users']);
  }
  redirectCreateUser(event) {
    this.router.navigate(['home/users/create']);
  }
  redirectReports(event) {
    this.router.navigate(['home/reports']);
  }

  redirectLogout(event) {
    this.service.username = undefined;
    this.service.user_type = undefined;
    this.router.navigate(['']);
  }
  search_user(username) {
    for (const user of this.service.users) {
      if (user.username === username) {
        return user;
      }
    }
  }
}
