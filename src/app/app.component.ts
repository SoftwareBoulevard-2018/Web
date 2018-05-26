import { Component } from '@angular/core';
import {Inject} from '@angular/core';
import { GeneralServiceService } from './general-service.service';
import {Router} from '@angular/router';
import {HttpService} from './http.service';
import {User} from './shared/user';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';


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

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
              public httpService: HttpService, public service: GeneralServiceService, public router: Router) { }

  title = 'app';
  public data: any = [];

  getFromLocal(key): void {
    console.log('recieved= key:' + key);
    this.data[key] = this.storage.get(key);
    console.log(this.data[key]);
    if (this.data[key] !== undefined || this.data[key] !== null) {
      if (this.data[key].role === 'Analyst' || this.data[key].role === 'Developer'
        || this.data[key].role === 'Tester') {
        this.service.user_type = 'Team Member';
        this.service.user = this.data[key];
        this.router.navigate(['home']);
      } else if (this.data[key].role === 'Project Manager') {
        this.service.user_type = 'Project Manager';
        this.service.user = this.data[key];
        this.router.navigate(['home']);
      } else {
        this.service.user_type = 'Game Administrator';
        this.service.user = this.data[key];
        this.router.navigate(['home']);
      }
      this.service.loggedusr = true;
    } else {
      console.log('There is no user logged in');
    }
  }

  ngOnInit() {
    this.getSession();
  }

  getSession() {
        this.getFromLocal('userInSession');
  }
}
