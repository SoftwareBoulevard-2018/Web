import { Component } from '@angular/core';
import { GeneralServiceService } from './general-service.service';
import {Router} from '@angular/router';
import {HttpService} from './http.service';
import {User} from './shared/user';


@Component({
  selector: 'app-root',
  // This defines the components that will appear on the whole app, the router-outlet is the one that changes
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
	   <app-email></app-email>
    <app-footer></app-footer>
  `,
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }

  title = 'app';

  ngOnInit() {
    this.getSession();
  }

  getSession() {
    return this.httpService.getSession().subscribe(data => {
        if (data.role === 'Analyst' || data.role === 'Developer' || data.role === 'Tester') {
          this.service.user_type = 'Team Member';
          this.service.user = data;
          this.router.navigate(['home']);
        } else if (data.role === 'Project Manager') {
          this.service.user_type = 'Project Manager';
          this.service.user = data;
          this.router.navigate(['home']);
        } else {
          this.service.user_type = 'Game Administrator';
          this.service.user = data;
          this.router.navigate(['home']);
        }
        this.service.loggedusr = true;
      },
      error => { console.log('There is no user logged in'); });
  }
}
