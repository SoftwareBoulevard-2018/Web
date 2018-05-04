import { Component } from '@angular/core';
import { GeneralServiceService } from './general-service.service';
import { EmailComponent } from './email/email.component'

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
	  <app-email></app-email>
    <app-footer></app-footer>
  `,
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  ngOnInit() {
  }
}
